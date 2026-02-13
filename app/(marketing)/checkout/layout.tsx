import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Checkout',
  description: 'Complete your aluminium profiles order — ALTEG UK. Review cart, enter delivery details, and place your order. Free cutting to size, UK delivery.',
  robots: { index: false, follow: true },
  openGraph: {
    title: 'Checkout | ALTEG UK',
    description: 'Complete your aluminium profiles order. Review cart and place order.',
    url: '/checkout',
  },
};

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
