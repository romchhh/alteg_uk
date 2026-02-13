import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Contact ALTEG UK — aluminium profiles manufacturer. Phone, email, WhatsApp. Warehouse & office: Littlehampton, West Sussex. Get a quote or request support.',
  openGraph: {
    title: 'Contact | ALTEG UK',
    description: 'Contact ALTEG UK — aluminium profiles manufacturer. Phone, email, WhatsApp. Littlehampton, West Sussex.',
    url: '/contact',
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
