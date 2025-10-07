# Super Deep Research

A minimal research platform where users can submit research questions for $1 and receive comprehensive analysis delivered as PDF reports to their email in 3 days.

## Features

- Clean, minimal interface with Stripe checkout integration
- $1 per query pricing with secure payment processing
- 3-day research turnaround with PDF delivery
- Spam prevention through payment requirement
- Responsive design with dark mode support
- Vercel deployment ready with integrated database and Stripe

## Tech Stack

- **Frontend**: Next.js 15 with TypeScript
- **Styling**: Tailwind CSS
- **Payments**: Stripe Checkout & Webhooks
- **Database**: Vercel Postgres
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Stripe account

### Installation

1. Clone the repository
2. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Set up environment variables:
   - Copy `.env.example` to `.env.local`
   - Add your Vercel Postgres connection strings
   - Add your Stripe API keys

5. Run the development server:
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## Deployment

### Vercel Deployment

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add a Vercel Postgres database to your project
4. Add Stripe environment variables in Vercel dashboard:
   - `STRIPE_PUBLISHABLE_KEY`
   - `STRIPE_SECRET_KEY`
   - `STRIPE_WEBHOOK_SECRET`
5. Deploy - database environment variables will be automatically configured

### Stripe Setup

1. Create a Stripe account and get your API keys
2. Set up a webhook endpoint: `https://your-domain.com/api/webhook`
3. Configure webhook to listen for `checkout.session.completed` events
4. Add the webhook secret to your environment variables

### Environment Variables

**Database (automatically set by Vercel):**
- `POSTGRES_URL`
- `POSTGRES_PRISMA_URL` 
- `POSTGRES_URL_NO_SSL`
- `POSTGRES_URL_NON_POOLING`
- `POSTGRES_USER`
- `POSTGRES_HOST`
- `POSTGRES_PASSWORD`
- `POSTGRES_DATABASE`

**Stripe (add manually):**
- `STRIPE_PUBLISHABLE_KEY`
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`

## Project Structure

```
frontend/
├── src/
│   ├── app/
│   │   ├── about/
│   │   │   └── page.tsx          # About page
│   │   ├── success/
│   │   │   └── page.tsx          # Payment success page
│   │   ├── api/
│   │   │   ├── create-checkout/
│   │   │   │   └── route.ts      # Stripe checkout session creation
│   │   │   └── webhook/
│   │   │       └── route.ts      # Stripe webhook handler
│   │   ├── globals.css           # Global styles
│   │   ├── layout.tsx            # Root layout
│   │   └── page.tsx              # Home page with query form
├── lib/
│   └── db.ts                     # Database utilities and queries
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── vercel.json                   # Vercel configuration
```

## Features

### Payment Processing
- Secure Stripe checkout integration
- $1 per research query
- Email collection through Stripe
- Automatic database record creation via webhook

### Database Schema
- `research_queries` table with query, email, payment status, Stripe IDs
- Indexed for efficient querying by email, payment status, and date
- Automatic database initialization on first API call

### Spam Prevention
- Payment requirement ($1) prevents spam submissions
- Stripe handles email validation and collection
- Secure payment processing with no stored payment data

## API Endpoints

### POST /api/create-checkout
Create a Stripe checkout session for research query payment.

**Request Body:**
```json
{
  "query": "Your research question (10-1000 characters)"
}
```

**Response:**
```json
{
  "sessionId": "cs_...",
  "url": "https://checkout.stripe.com/..."
}
```

### POST /api/webhook
Stripe webhook handler for processing successful payments.

**Events Handled:**
- `checkout.session.completed` - Creates research query in database

## User Flow

1. **Submit Query**: User enters research question on homepage
2. **Stripe Checkout**: Redirected to Stripe for $1 payment + email
3. **Payment Success**: Redirected to success page
4. **Webhook Processing**: Research query saved to database
5. **Research Process**: 3-day research period
6. **PDF Delivery**: Comprehensive report emailed as PDF

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.