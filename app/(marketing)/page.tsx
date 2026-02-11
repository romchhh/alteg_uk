import React from 'react';
import { getHomepageSettings } from '@/lib/data/homepage';
import { HeroSection } from '@/components/landing/HeroSection';
import { FeaturesSection } from '@/components/landing/FeaturesSection';
import { DescriptionSection } from '@/components/landing/DescriptionSection';
import { OrderCalculator } from '@/components/catalog/OrderCalculator';
import { CatalogSection } from '@/components/catalog/CatalogSection';
import { FactoryGallery } from '@/components/landing/FactoryGallery';
import { TrustSection } from '@/components/landing/TrustSection';
import { AnimatedPromoBanners } from '@/components/landing/AnimatedPromoBanners';
import { PromoBanners } from '@/components/landing/PromoBanners';
import { HowToOrderSection } from '@/components/landing/HowToOrderSection';
import { FAQSection } from '@/components/landing/FAQSection';
import { CustomerSegments } from '@/components/landing/CustomerSegments';
import { MapSection } from '@/components/landing/MapSection';
import { ShoppingCart } from '@/components/cart/ShoppingCart';

export default async function HomePage() {
  const homepageSettings = await getHomepageSettings();
  return (
    <main className="min-h-screen">
      {/* Block 1: Hero Banner */}
      <HeroSection
        heroTitle={homepageSettings.heroTitle}
        heroSubtitle={homepageSettings.heroSubtitle}
      />
      
      {/* Block 2: Features (Dark section with 4 features) - commented out
      <FeaturesSection />
      */}
      
      {/* Block 2.1: Description Section (About ALTEG) - commented out
      <DescriptionSection />
      */}
      
      {/* Block 2.2: Interactive Calculator and Order Builder */}
      <OrderCalculator />
      
      {/* Block 2.3: Product Catalog */}
      <CatalogSection />
      
      {/* Block 2.4: Factory Gallery */}
      <FactoryGallery />
      
      {/* Block 3: Trust, Production & Logistics */}
      <TrustSection />

      {/* Dynamic marketing strips (animated) — above the 4 promo cards */}
      <AnimatedPromoBanners />
      
      {/* Block 4: Promotions & Incentives (4 banners) */}
      <PromoBanners />
      
      {/* Block 5: How to Order (3 Steps) */}
      <HowToOrderSection />
      
      {/* Block 6: FAQ */}
      <FAQSection />
      
      {/* Block 7: Customer Segments */}
      <CustomerSegments />

      {/* Block 8: Find Us on the Map (above footer) */}
      <MapSection />

      {/* Shopping Cart */}
      <ShoppingCart />
    </main>
  );
}
