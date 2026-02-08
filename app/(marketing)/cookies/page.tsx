import React from 'react';
import { siteConfig } from '@/config/site';
import Link from 'next/link';

export default function CookiesPage() {
  return (
    <main className="min-h-screen bg-white pt-16 md:pt-20">
      <section className="bg-gradient-to-br from-[#050544] to-[#445DFE] text-white py-12 sm:py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 leading-tight">
              Cookie Policy
            </h1>
            <p className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto">
              How we use cookies and similar technologies on our website.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto prose prose-gray prose-lg">
            <p className="text-gray-600 mb-8">
              Last updated: {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}. 
              This policy applies to {siteConfig.name} ({siteConfig.url}).
            </p>

            <h2 className="text-2xl font-bold text-[#050544] mt-10 mb-4">1. What are cookies?</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Cookies are small text files stored on your device when you visit a website. They are widely used to make sites work properly, remember your preferences, and understand how visitors use the site.
            </p>

            <h2 className="text-2xl font-bold text-[#050544] mt-10 mb-4">2. How we use cookies</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We use cookies and similar technologies (e.g. local storage) for:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
              <li><strong>Strictly necessary:</strong> essential for the site to function (e.g. session, security, load balancing). These cannot be switched off.</li>
              <li><strong>Functionality:</strong> to remember your choices (e.g. cart contents, preferences) so you don’t have to re-enter them.</li>
              <li><strong>Analytics/performance:</strong> to understand how the site is used (e.g. page views, errors) and improve it. We may use first-party or third-party tools for this.</li>
            </ul>

            <h2 className="text-2xl font-bold text-[#050544] mt-10 mb-4">3. Types of cookies we may use</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Session cookies are deleted when you close the browser. Persistent cookies remain for a set period (e.g. until you clear them or they expire). We only use cookies that are necessary for operation and, where we use optional ones (e.g. analytics), we aim to do so in line with your preferences and applicable law.
            </p>

            <h2 className="text-2xl font-bold text-[#050544] mt-10 mb-4">4. Third-party cookies</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Some pages may include content or features from third parties (e.g. maps, analytics). Those providers may set their own cookies. We do not control these; please check their privacy and cookie policies for details.
            </p>

            <h2 className="text-2xl font-bold text-[#050544] mt-10 mb-4">5. Managing cookies</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              You can control cookies via your browser settings. You can block or delete cookies; note that blocking strictly necessary cookies may affect how the site works (e.g. cart or login). For more on your choices, see your browser’s help or visit <a href="https://www.aboutcookies.org" target="_blank" rel="noopener noreferrer" className="text-[#445DFE] hover:underline">aboutcookies.org</a>.
            </p>

            <h2 className="text-2xl font-bold text-[#050544] mt-10 mb-4">6. More information</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              For how we process personal data collected via cookies, see our <Link href="/privacy" className="text-[#445DFE] hover:underline">Privacy Policy</Link>. If you have questions about our use of cookies, contact us at{' '}
              <a href={`mailto:${siteConfig.links.email}`} className="text-[#445DFE] hover:underline">{siteConfig.links.email}</a>.
            </p>

            <p className="text-gray-600 mt-12 pt-8 border-t border-gray-200">
              <Link href="/" className="text-[#445DFE] font-semibold hover:underline">← Back to home</Link>
              {' · '}
              <Link href="/privacy" className="text-[#445DFE] font-semibold hover:underline">Privacy Policy</Link>
              {' · '}
              <Link href="/terms" className="text-[#445DFE] font-semibold hover:underline">Terms of Use</Link>
              {' · '}
              <Link href="/contact" className="text-[#445DFE] font-semibold hover:underline">Contact us</Link>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
