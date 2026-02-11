import React from 'react';
import { siteConfig } from '@/config/site';

export const MapSection: React.FC = () => {
  return (
    <section className="pt-12 sm:pt-16 md:pt-20 pb-12 sm:pb-16 md:pb-20 bg-gradient-to-b from-[#E9EDF4] to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <h2 className="text-3xl sm:text-4xl font-bold text-[#050544] mb-6 text-center">
          Find Us on the Map
        </h2>
        <div className="bg-gray-200 rounded-lg overflow-hidden shadow-lg" style={{ height: '400px' }}>
          <iframe
            src={siteConfig.links.mapEmbedUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="ALTEG UK - Bridge Rd, Wick, Littlehampton"
          />
        </div>
        <p className="text-center text-gray-600 mt-4 text-sm">
          <a
            href={siteConfig.links.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#445DFE] font-semibold hover:underline"
          >
            Open in Google Maps
          </a>
          {' — '}
          {siteConfig.links.address}
        </p>
      </div>
    </section>
  );
};
