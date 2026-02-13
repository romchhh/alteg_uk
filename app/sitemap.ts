import { MetadataRoute } from 'next';
import { siteConfig } from '@/config/site';

const baseUrl = siteConfig.url;

/** Public marketing pages for SEO sitemap. Admin and API routes are excluded. */
const staticRoutes: { url: string; lastModified?: string; changeFrequency?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'; priority?: number }[] = [
  { url: '', changeFrequency: 'weekly', priority: 1 },
  { url: '/wholesale', changeFrequency: 'weekly', priority: 0.9 },
  { url: '/delivery', changeFrequency: 'monthly', priority: 0.8 },
  { url: '/contact', changeFrequency: 'monthly', priority: 0.8 },
  { url: '/checkout', changeFrequency: 'daily', priority: 0.7 },
  { url: '/privacy', changeFrequency: 'yearly', priority: 0.3 },
  { url: '/terms', changeFrequency: 'yearly', priority: 0.3 },
  { url: '/cookies', changeFrequency: 'yearly', priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return staticRoutes.map(({ url, lastModified, changeFrequency, priority }) => ({
    url: url ? `${baseUrl}/${url.replace(/^\//, '')}` : baseUrl,
    lastModified: lastModified ? new Date(lastModified) : new Date(),
    changeFrequency,
    priority,
  }));
}
