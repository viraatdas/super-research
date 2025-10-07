import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { Resend } from 'resend';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2025-09-30.clover',
});

const resend = new Resend(process.env.RESEND_API_KEY);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || '';

async function sendNotificationEmail(customerEmail: string, query: string) {
  try {
    const { data, error } = await resend.emails.send({
      from: 'Deepest Research <onboarding@resend.dev>',
      to: ['viraat@exla.ai'],
      subject: 'Deepest Research: New Request',
      html: `
        <h2>New Research Request - Payment Completed</h2>
        <p><strong>Customer Email:</strong> ${customerEmail}</p>
        <p><strong>Research Query:</strong></p>
        <blockquote style="border-left: 4px solid #f97316; padding-left: 16px; margin: 16px 0; color: #374151;">
          ${query}
        </blockquote>
        <p><em>This request was submitted through the Deepest Research website and payment has been completed.</em></p>
      `,
    });

    if (error) {
      console.error('Resend API error:', error);
      throw error;
    }

    console.log('Email sent successfully:', data);
    return data;
  } catch (emailError) {
    console.error('Failed to send email:', emailError);
    throw emailError;
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = request.headers.get('stripe-signature')!;
    
    let event: Stripe.Event;
    
    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err) {
      console.error('Webhook signature verification failed:', err);
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }
    
    // Handle the event
    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object as Stripe.Checkout.Session;
        
        if (session.payment_status === 'paid') {
          const query = session.metadata?.query;
          const customerEmail = session.customer_details?.email;
          
          console.log(`✅ Payment successful for research query: "${query?.substring(0, 50)}..." by ${customerEmail}`);
          
          // Send notification email to viraat@exla.ai now that payment is completed
          if (customerEmail && query) {
            try {
              console.log('Sending notification email after successful payment...');
              await sendNotificationEmail(customerEmail, query);
              console.log('✅ Notification email sent successfully');
            } catch (emailError) {
              console.error('❌ Failed to send notification email:', emailError);
              // Don't fail the webhook if email fails
            }
          } else {
            console.error('❌ Missing customer email or query in session metadata');
          }
          
          // Here you would typically:
          // 1. Save to database
          // 2. Start the research process
          // 3. Send confirmation email to customer
        }
        break;
        
      case 'payment_intent.succeeded':
        console.log('✅ Payment intent succeeded:', event.data.object.id);
        break;
        
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }
    
    return NextResponse.json({ received: true });
    
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}
