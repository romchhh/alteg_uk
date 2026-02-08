import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Wholesale & Bulk Orders | ALTEG',
  description: 'Wholesale aluminium profiles from ALTEG factory from 100 kg. Volume discounts and request a quote.',
};

export default function WholesaleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
