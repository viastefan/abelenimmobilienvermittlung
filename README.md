# Abelen Immobilien

Modern Next.js real estate website with Supabase integration for property management.

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up environment variables by copying `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Environment Variables

- `NEXT_PUBLIC_SITE_URL` - Public site URL for canonical links
- `NEXT_PUBLIC_SUPABASE_URL` - Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase anonymous key
- `RESEND_API_KEY` - API key for Resend email service
- `CONTACT_FROM_EMAIL` - Email address to send from
- `CONTACT_TO_EMAIL` - Email address to receive contact form submissions

## Features

- Property listings with Supabase integration
- Admin dashboard for managing properties
- Contact form with email notifications
- SEO optimized with structured data
- Responsive design with Tailwind CSS