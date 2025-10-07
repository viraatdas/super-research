import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { Resend } from 'resend';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2025-09-30.clover',
});

const resend = new Resend(process.env.RESEND_API_KEY);

async function sendNotificationEmail(customerEmail: string, query: string) {
  const { data, error } = await resend.emails.send({
    from: 'Super Deep Research <notifications@viraat.dev>',
    to: ['viraat@exla.ai'],
    subject: 'Super Deep Research: New Request',
    html: `
      <h2>New Research Request</h2>
      <p><strong>Customer Email:</strong> ${customerEmail}</p>
      <p><strong>Research Query:</strong></p>
      <blockquote style="border-left: 4px solid #f97316; padding-left: 16px; margin: 16px 0; color: #374151;">
        ${query}
      </blockquote>
      <p><em>This request was submitted through the Super Deep Research website.</em></p>
    `,
  });

  if (error) {
    throw error;
  }

  return data;
}

export async function POST(request: NextRequest) {
  try {
    const { query, email } = await request.json();
    
    if (!query || query.length < 10) {
      return NextResponse.json(
        { error: 'Please provide a detailed research question (at least 10 characters)' },
        { status: 400 }
      );
    }
    
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Please provide a valid email address' },
        { status: 400 }
      );
    }

    // Construct proper URLs for Stripe
    const origin = request.headers.get('origin');
    const host = request.headers.get('host');
    console.log('Origin header:', origin);
    console.log('Host header:', host);
    
    // Construct base URL properly
    let baseUrl;
    if (origin) {
      baseUrl = origin;
    } else if (host) {
      // Assume http for localhost, https for everything else
      const protocol = host.includes('localhost') ? 'http' : 'https';
      baseUrl = `${protocol}://${host}`;
    } else {
      baseUrl = 'http://localhost:3000'; // fallback
    }
    
    console.log('Using base URL:', baseUrl);

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Super Deep Research',
              description: 'Automated research task - 3 days processing time',
            },
            unit_amount: 100, // $1.00 in cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${baseUrl}/success`,
      cancel_url: `${baseUrl}/`,
      customer_email: email,
      metadata: {
        query: query.substring(0, 500), // Limit metadata size
        email: email,
      },
    });

    // Send notification email to viraat@exla.ai
    try {
      await sendNotificationEmail(email, query);
    } catch (emailError) {
      console.error('Failed to send notification email:', emailError);
      // Don't fail the request if email fails
    }

    return NextResponse.json({
      url: session.url,
    });
    
  } catch (error) {
    console.error('Checkout error details:', error);
    
    // More detailed error for debugging
    let errorMessage = 'Unable to create checkout session. Please try again.';
    if (error instanceof Error) {
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
      // Don't expose detailed errors to client in production
      if (process.env.NODE_ENV === 'development') {
        errorMessage = error.message;
      }
    }
    
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
