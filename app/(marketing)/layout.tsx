import React from 'react';
import { Footer } from '@/components/landing/Footer';
import { Header } from '@/components/landing/Header';

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
