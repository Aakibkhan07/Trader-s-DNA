# Trader's DNA

> Where Psychology Meets Precision.

The world's most premium AI behavioral intelligence platform for traders.

## Features

- **AI Behavioral Analysis** - Upload trade screenshots and get detailed psychological analysis
- **DNA Breakdown** - Comprehensive scoring of your trading DNA across multiple dimensions
- **Psychology Tracking** - Monitor emotional patterns, discipline, and behavioral triggers
- **AI Mentor** - 24/7 personalized guidance from an AI trading coach
- **Performance Genome** - Visual analytics revealing peak performance windows
- **Savage Scan Mode** - Brutally honest AI feedback for self-improvement

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Animation:** Framer Motion
- **State:** Zustand
- **Database:** Supabase (PostgreSQL)
- **AI:** OpenAI + Claude API

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
cd trader-dna

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local

# Update .env.local with your credentials:
# - NEXT_PUBLIC_SUPABASE_URL
# - NEXT_PUBLIC_SUPABASE_ANON_KEY
# - OPENAI_API_KEY
# - ANTHROPIC_API_KEY
# - RAZORPAY_KEY_ID / RAZORPAY_KEY_SECRET
# - TELEGRAM_BOT_TOKEN

# Run development server
npm run dev
```

### Environment Variables

See `.env.example` for all required environment variables.

## Project Structure

```
trader-dna/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Authentication pages
│   │   ├── login/
│   │   └── register/
│   ├── (dashboard)/       # Dashboard pages
│   │   └── dashboard/
│   ├── (marketing)/       # Marketing pages
│   │   └── pricing/
│   ├── api/               # API routes (to be implemented)
│   ├── layout.tsx
│   ├── page.tsx           # Landing page
│   └── globals.css
├── components/
│   ├── ui/                # Core UI components
│   ├── landing/           # Landing page components
│   ├── dashboard/         # Dashboard components
│   └── auth/              # Auth components
├── lib/                   # Utilities
│   ├── supabase.ts        # Supabase client
│   └── utils.ts           # Helper functions
├── stores/                # Zustand stores
└── types/                 # TypeScript definitions
```

## Pages

- **/** - Premium landing page with 14 sections
- **/login** - User login with email/password + Google
- **/register** - User registration
- **/pricing** - Subscription plans
- **/dashboard** - Main user dashboard with AI analysis

## Build Status

```bash
npm run build  # ✓ Successfully builds
npm run dev    # Start development server
npm run lint   # Run ESLint
```

## Next Steps

- [ ] Implement API routes for AI analysis
- [ ] Add Supabase database schema
- [ ] Integrate OpenAI/Claude for trade analysis
- [ ] Add Razorpay payment integration
- [ ] Build admin panel
- [ ] Add Telegram bot integration
- [ ] Implement referral system

## License

© 2026 Trade Metrix Technologies. All rights reserved.