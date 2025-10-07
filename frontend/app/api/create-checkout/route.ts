import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2024-06-20',
});

export async function POST(request: NextRequest) {
  try {
    const { query } = await request.json();
    
    if (!query || query.length < 10) {
      return NextResponse.json(
        { error: 'Please provide a detailed research question (at least 10 characters)' },
        { status: 400 }
      );
    }

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
      success_url: `${request.headers.get('origin')}/success`,
      cancel_url: `${request.headers.get('origin')}/`,
      metadata: {
        query: query.substring(0, 500), // Limit metadata size
      },
    });

    return NextResponse.json({
      url: session.url,
    });
    
  } catch (error) {
    console.error('Checkout error:', error);
    return NextResponse.json(
      { error: 'Unable to create checkout session. Please try again.' },
      { status: 500 }
    );
  }
}
