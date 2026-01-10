# ALTEG UK Website

A modern, responsive Next.js website for ALTEG UK - an aluminium profiles supplier in the UK.

## Tech Stack

- **Framework**: Next.js 16+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **State Management**: Zustand
- **Forms**: React Hook Form + Zod validation
- **API Integration**: Bitrix24 CRM
- **Deployment**: Vercel / Custom hosting

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd alteg
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables

Create a `.env.local` file in the root directory:

```env
# Bitrix24 Integration
NEXT_PUBLIC_BITRIX24_WEBHOOK_URL=https://your-domain.bitrix24.com/rest/1/your-webhook-code/
NEXT_PUBLIC_BITRIX24_USER_ID=1

# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Environment
NODE_ENV=development
```

4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
alteg/
├── app/
│   ├── (marketing)/          # Marketing pages
│   │   ├── page.tsx          # Landing page
│   │   ├── wholesale/        # Wholesale inquiry page
│   │   ├── checkout/         # Cart & checkout
│   │   └── layout.tsx        # Marketing layout
│   ├── api/                  # API routes
│   │   ├── products/         # Product API
│   │   ├── quote/            # Quote requests
│   │   ├── order/            # Order submission
│   │   └── delivery/         # Delivery calculator
│   ├── globals.css
│   └── layout.tsx            # Root layout
├── components/
│   ├── landing/              # Landing page components
│   ├── shared/               # Shared UI components
│   └── forms/                # Form components
├── lib/
│   ├── constants/            # Constants and data
│   ├── utils/                # Utility functions
│   ├── services/             # API services
│   └── types/                # TypeScript types
├── hooks/                    # Custom React hooks
├── store/                    # Zustand stores
└── config/                   # Configuration files
```

## Key Features

- **Product Catalog**: Browse and search aluminium profiles
- **Shopping Cart**: Add products with custom lengths and quantities
- **Quote Requests**: Request quotes for wholesale orders
- **Order Management**: Complete checkout with delivery options
- **Bitrix24 Integration**: Automatically create leads/orders in CRM
- **Responsive Design**: Mobile-first, works on all devices
- **Free Cutting Service**: Specify custom lengths
- **Delivery Calculator**: Real-time delivery cost calculation

## Development

### Build for Production

```bash
npm run build
npm start
```

### Linting

```bash
npm run lint
```

## Environment Variables

See `.env.example` (or the environment setup section above) for required environment variables.

### Bitrix24 Setup

1. Get your Bitrix24 webhook URL from your Bitrix24 portal
2. Add it to `.env.local` as `NEXT_PUBLIC_BITRIX24_WEBHOOK_URL`
3. Optionally set `NEXT_PUBLIC_BITRIX24_USER_ID` for assigning leads/orders

## Deployment

### Vercel

The easiest way to deploy is using [Vercel](https://vercel.com):

1. Push your code to GitHub/GitLab/Bitbucket
2. Import your repository in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Custom Hosting

1. Build the application: `npm run build`
2. Start the production server: `npm start`
3. Ensure environment variables are set correctly

## Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## License

Copyright © ALTEG UK. All rights reserved.
