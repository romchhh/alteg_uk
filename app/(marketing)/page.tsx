import React from 'react';
import { HeroSection } from '@/components/landing/HeroSection';
import { FeaturesSection } from '@/components/landing/FeaturesSection';
import { DescriptionSection } from '@/components/landing/DescriptionSection';
import { OrderCalculator } from '@/components/catalog/OrderCalculator';
import { CatalogSection } from '@/components/catalog/CatalogSection';
import { TrustSection } from '@/components/landing/TrustSection';
import { PromoBanners } from '@/components/landing/PromoBanners';
import { HowToOrderSection } from '@/components/landing/HowToOrderSection';
import { FAQSection } from '@/components/landing/FAQSection';
import { CustomerSegments } from '@/components/landing/CustomerSegments';
import { ShoppingCart } from '@/components/cart/ShoppingCart';

export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* Block 1: Hero Banner */}
      <HeroSection />
      
      {/* Block 2: Features (Dark section with 4 features) */}
      <FeaturesSection />
      
      {/* Block 2.1: Description Section (About ALTEG) */}
      <DescriptionSection />
      
      {/* Block 2.2: Interactive Calculator and Order Builder */}
      <OrderCalculator />
      
      {/* Block 2.3: Product Catalog */}
      <CatalogSection />
      
      {/* Block 3: Trust, Production & Logistics */}
      <TrustSection />
      
      {/* Block 4: Promotions & Incentives */}
      <PromoBanners />
      
      {/* Block 5: How to Order (3 Steps) */}
      <HowToOrderSection />
      
      {/* Block 6: FAQ */}
      <FAQSection />
      
      {/* Block 7: Customer Segments */}
      <CustomerSegments />

      {/* Shopping Cart */}
      <ShoppingCart />
    </main>
  );
}
