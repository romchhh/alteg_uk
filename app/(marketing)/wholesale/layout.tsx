import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Wholesale & Bulk Orders',
  description: 'Wholesale aluminium profiles from ALTEG factory. Volume discounts from £100 (5%) to £10,000+ (25%). Request a quote.',
  openGraph: {
    title: 'Wholesale & Bulk Orders | ALTEG UK',
    description: 'Wholesale aluminium profiles. Volume discounts, free delivery over £77. Request a quote.',
    url: '/wholesale',
  },
};

export default function WholesaleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
