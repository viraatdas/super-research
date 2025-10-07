# Deployment Guide - Super Deep Research

## Quick Deploy to Vercel

### 1. Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit - Super Deep Research with Stripe"
git branch -M main
git remote add origin <your-github-repo-url>
git push -u origin main
```

### 2. Deploy to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Select the `frontend` folder as the root directory
5. Click "Deploy"

### 3. Add Database
1. In your Vercel project dashboard, go to "Storage"
2. Click "Create Database"
3. Select "Postgres"
4. Choose a name and region
5. Click "Create"

The database environment variables will be automatically added to your project.

### 4. Set up Stripe

#### Get Stripe API Keys
1. Create a [Stripe account](https://stripe.com) if you don't have one
2. Go to your Stripe Dashboard
3. Navigate to "Developers" → "API keys"
4. Copy your Publishable key and Secret key

#### Add Stripe Environment Variables to Vercel
1. In your Vercel project dashboard, go to "Settings" → "Environment Variables"
2. Add the following variables:
   - `STRIPE_PUBLISHABLE_KEY`: Your Stripe publishable key (pk_test_... or pk_live_...)
   - `STRIPE_SECRET_KEY`: Your Stripe secret key (sk_test_... or sk_live_...)
   - `STRIPE_WEBHOOK_SECRET`: (We'll get this in the next step)

#### Set up Stripe Webhook
1. In your Stripe Dashboard, go to "Developers" → "Webhooks"
2. Click "Add endpoint"
3. Enter your webhook URL: `https://your-vercel-domain.vercel.app/api/webhook`
4. Select events to listen for:
   - `checkout.session.completed`
5. Click "Add endpoint"
6. Copy the "Signing secret" (starts with `whsec_`)
7. Add this as `STRIPE_WEBHOOK_SECRET` in your Vercel environment variables

### 5. Redeploy
After adding all environment variables, trigger a new deployment:
1. Go to "Deployments" in your Vercel dashboard
2. Click the three dots on the latest deployment
3. Click "Redeploy"

### 6. Test Your Deployment
1. Visit your deployed URL
2. Try submitting a research query
3. Complete the Stripe checkout process (use test card: 4242 4242 4242 4242)
4. Verify the success page loads
5. Check your Vercel function logs for any errors

## Local Development

### 1. Set up environment
```bash
cd frontend
npm install
cp .env.example .env.local
```

### 2. Add environment variables to .env.local
```bash
# Database (get from Vercel dashboard or use local Postgres)
POSTGRES_URL="your-postgres-url"

# Stripe (get from Stripe dashboard)
STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..." # Optional for local dev
```

### 3. Run development server
```bash
npm run dev
```

Visit `http://localhost:3000` to see your app.

### 4. Test Stripe Integration Locally
For local webhook testing, use Stripe CLI:
```bash
# Install Stripe CLI
# Then forward webhooks to your local server
stripe listen --forward-to localhost:3000/api/webhook
```

## Production Checklist

### Before Going Live
- [ ] Switch to Stripe live keys (remove `_test_` keys)
- [ ] Update webhook endpoint to production URL
- [ ] Test the complete payment flow
- [ ] Verify database is working correctly
- [ ] Check all environment variables are set
- [ ] Test email delivery (you may need to implement actual email sending)

### Stripe Live Mode
1. In Stripe Dashboard, toggle to "Live mode"
2. Get your live API keys
3. Update environment variables in Vercel with live keys
4. Create new webhook endpoint for production URL
5. Update `STRIPE_WEBHOOK_SECRET` with live webhook secret

## Environment Variables Reference

### Required for Production
- `POSTGRES_URL` (auto-set by Vercel)
- `STRIPE_PUBLISHABLE_KEY` (from Stripe dashboard)
- `STRIPE_SECRET_KEY` (from Stripe dashboard)
- `STRIPE_WEBHOOK_SECRET` (from Stripe webhook endpoint)

### Database Schema
The database tables are automatically created when the first webhook is received:
- `research_queries` table for storing paid submissions
- Indexes for efficient querying
- Payment status tracking

## Troubleshooting

### Common Issues

**Build Errors**
- Run `npm run build` locally to catch TypeScript errors
- Check all imports and dependencies

**Stripe Webhook Issues**
- Verify webhook URL is correct and accessible
- Check webhook secret matches environment variable
- Look at Stripe webhook logs for delivery attempts

**Database Connection Issues**
- Verify Postgres database is created in Vercel
- Check environment variables are properly set
- Look at function logs for connection errors

**Payment Flow Issues**
- Test with Stripe test cards: 4242 4242 4242 4242
- Check browser console for JavaScript errors
- Verify success/cancel URLs are correct

### Monitoring
- Check Vercel function logs for API errors
- Monitor Stripe webhook delivery in Stripe dashboard
- Set up error tracking (Sentry, etc.) for production

## Next Steps
- Implement actual research workflow
- Set up email sending for PDF delivery
- Add admin dashboard to view submissions
- Implement research status updates
- Add email templates and branding