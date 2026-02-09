export interface HomepageSettings {
  heroTitle: string;
  heroSubtitle: string;
  heroImage?: string;
  promoBanners?: { title: string; description: string; link?: string }[];
}

const DEFAULT_HOMEPAGE: HomepageSettings = {
  heroTitle: 'ALTEG — Aluminium Directly from the Factory',
  heroSubtitle: 'Calculate costs and order online with UK delivery. Direct manufacturer prices.',
};

import { getDb } from '@/lib/db/sqlite';

export async function getHomepageSettings(): Promise<HomepageSettings> {
  const database = getDb();
  const rows = database.prepare('SELECT key, value FROM homepage').all() as { key: string; value: string }[];
  const map = Object.fromEntries(rows.map((r) => [r.key, r.value]));

  return {
    ...DEFAULT_HOMEPAGE,
    heroTitle: map.heroTitle ?? DEFAULT_HOMEPAGE.heroTitle,
    heroSubtitle: map.heroSubtitle ?? DEFAULT_HOMEPAGE.heroSubtitle,
    heroImage: map.heroImage || undefined,
    promoBanners: map.promoBanners ? JSON.parse(map.promoBanners) : undefined,
  };
}

export async function saveHomepageSettings(settings: Partial<HomepageSettings>): Promise<void> {
  const current = await getHomepageSettings();
  const merged = { ...current, ...settings };

  const database = getDb();
  const stmt = database.prepare(`
    INSERT INTO homepage (key, value) VALUES (?, ?)
    ON CONFLICT(key) DO UPDATE SET value = excluded.value
  `);

  const tx = database.transaction(() => {
    if (merged.heroTitle != null) stmt.run('heroTitle', merged.heroTitle);
    if (merged.heroSubtitle != null) stmt.run('heroSubtitle', merged.heroSubtitle);
    if (merged.heroImage != null) stmt.run('heroImage', merged.heroImage);
    if (merged.promoBanners != null) stmt.run('promoBanners', JSON.stringify(merged.promoBanners));
  });
  tx();
}
