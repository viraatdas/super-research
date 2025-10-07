# Super Deep Research - Frontend

A minimalist research request platform that runs automated deep research for 3 days.

## Features

- Clean, simple UI for submitting research queries
- Email collection for customer communication
- Stripe payment integration ($1 per query)
- Automatic email notifications to viraat@exla.ai
- 3-day automated research processing

## Environment Variables

Create a `.env.local` file with:

```bash
# Stripe Configuration
STRIPE_PUBLISHABLE_KEY="pk_live_..."
STRIPE_SECRET_KEY="sk_live_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

# Email Configuration (Resend)
RESEND_API_KEY="re_..."

# Next.js Configuration
NEXT_PUBLIC_SITE_URL="https://yoursite.netlify.app"
```

## Local Development

```bash
npm install
npm run dev
```

## Deployment (Netlify)

1. Connect your GitHub repo to Netlify
2. Set environment variables in Netlify dashboard
3. Deploy automatically on push to main

## Email Setup

1. Sign up at https://resend.com
2. Verify your domain or use resend's domain
3. Add API key to environment variables
4. Update the `from` address in the API route if needed
