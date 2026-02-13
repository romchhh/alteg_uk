import React from 'react';
import { siteConfig } from '@/config/site';

const baseUrl = siteConfig.url;

/** Address for schema.org (LocalBusiness / Organization) */
const address = {
  '@type': 'PostalAddress',
  streetAddress: 'Unit A3, Riverside Industrial Estate',
  addressLocality: 'Littlehampton',
  addressRegion: 'West Sussex',
  postalCode: 'BN17 5DF',
  addressCountry: 'GB',
};

/** Organization + LocalBusiness + WebSite JSON-LD for SEO */
const organizationSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${baseUrl}/#organization`,
      name: siteConfig.name,
      url: baseUrl,
      logo: { '@type': 'ImageObject', url: `${baseUrl}/alteg-logo.png` },
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: siteConfig.links.phone,
        contactType: 'customer service',
        email: siteConfig.links.email,
        areaServed: 'GB',
        availableLanguage: 'English',
      },
      address,
      sameAs: siteConfig.links.trustpilot ? [siteConfig.links.trustpilot] : undefined,
    },
    {
      '@type': 'LocalBusiness',
      '@id': `${baseUrl}/#localbusiness`,
      name: siteConfig.name,
      image: `${baseUrl}${siteConfig.ogImage}`,
      url: baseUrl,
      telephone: siteConfig.links.phone,
      email: siteConfig.links.email,
      address,
      description: siteConfig.description,
      openingHoursSpecification: {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '18:00',
      },
      priceRange: '££',
      areaServed: { '@type': 'Country', name: 'United Kingdom' },
    },
    {
      '@type': 'WebSite',
      '@id': `${baseUrl}/#website`,
      url: baseUrl,
      name: siteConfig.name,
      description: siteConfig.description,
      publisher: { '@id': `${baseUrl}/#organization` },
      potentialAction: {
        '@type': 'SearchAction',
        target: { '@type': 'EntryPoint', urlTemplate: `${baseUrl}/#catalog` },
        'query-input': 'required name=search_term_string',
      },
    },
  ],
};

export function JsonLd(): React.ReactElement {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
    />
  );
}
