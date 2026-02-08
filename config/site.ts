import type { Metadata } from 'next';

export const siteConfig = {
  name: 'ALTEG UK',
  description: 'Buy aluminium profiles directly from manufacturer. Free cutting. UK delivery. Factory prices.',
  url: 'https://alteg-uk.co.uk',
  ogImage: '/og-image.jpg',
  links: {
    email: 'info@alteg-uk.co.uk',
    phone: '+447441429829',
    phoneDisplay: '+44 7441 429829',
    address: 'Unit A3, Riverside Industrial Estate, Littlehampton, West Sussex, BN17 5DF',
    mapUrl: 'https://goo.gl/maps/h5iBbC38PnGJpkUc9',
    mapEmbedUrl: 'https://www.google.com/maps?q=Unit+A3+Riverside+Industrial+Estate+Littlehampton+West+Sussex+BN17+5DF&z=16&output=embed',
  },
} as const;

export const metadata: Metadata = {
  title: {
    default: 'ALTEG UK - Aluminium Profiles Direct from Factory',
    template: '%s | ALTEG UK',
  },
  description: 'Buy aluminium angles, tubes, sheets directly from manufacturer. Free cutting. UK delivery. Factory prices.',
  keywords: [
    'aluminium profiles UK',
    'aluminium angle',
    'aluminium tube',
    'aluminium sheet',
    'factory prices',
    'aluminium supplier UK',
    'wholesale aluminium',
    'aluminium cutting service',
  ],
  authors: [{ name: 'ALTEG UK' }],
  creator: 'ALTEG UK',
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.png', sizes: 'any' },
      { url: '/favicon.png', type: 'image/png', sizes: '32x32' },
      { url: '/favicon.png', type: 'image/png', sizes: '16x16' },
    ],
    apple: [
      { url: '/favicon.png', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: '/favicon.png',
    other: [
      {
        rel: 'icon',
        url: '/favicon.png',
        type: 'image/png',
      },
    ],
  },
};
