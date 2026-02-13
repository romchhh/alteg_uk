import React from 'react';
import { siteConfig } from '@/config/site';
import { FAQ_ITEMS } from '@/lib/constants/faq';

const baseUrl = siteConfig.url;

/** FAQPage schema for rich results in search. */
const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ_ITEMS.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.answer,
    },
  })),
};

export function FaqJsonLd(): React.ReactElement {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
    />
  );
}
