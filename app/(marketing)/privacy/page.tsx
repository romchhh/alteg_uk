import React from 'react';
import { siteConfig } from '@/config/site';
import Link from 'next/link';

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-white pt-16 md:pt-20">
      <section className="bg-gradient-to-br from-[#050544] to-[#445DFE] text-white py-12 sm:py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 leading-tight">
              Privacy Policy
            </h1>
            <p className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto">
              How we collect, use and protect your personal information.
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

            <h2 className="text-2xl font-bold text-[#050544] mt-10 mb-4">1. Who we are</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              {siteConfig.name} is a supplier of aluminium profiles and related services. We are committed to protecting your privacy and handling your data in an open and transparent way.
            </p>

            <h2 className="text-2xl font-bold text-[#050544] mt-10 mb-4">2. Data we collect</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We may collect and process the following data when you use our website or get in touch:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
              <li>Contact details (name, email, phone, company) when you submit contact, quote or wholesale inquiry forms</li>
              <li>Order and delivery details (address, postcode, delivery preferences) when you place an order</li>
              <li>Technical data (IP address, browser type, device) for security and analytics</li>
              <li>Cookie data as described in our <Link href="/cookies" className="text-[#445DFE] hover:underline">Cookie Policy</Link></li>
            </ul>

            <h2 className="text-2xl font-bold text-[#050544] mt-10 mb-4">3. How we use your data</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We use your data to: process orders and inquiries, send quotes and commercial proposals, communicate about delivery and support, improve our website and services, and comply with legal obligations.
            </p>

            <h2 className="text-2xl font-bold text-[#050544] mt-10 mb-4">4. Legal basis</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We process your data on the basis of: performance of a contract (orders), your consent (forms, marketing where applicable), and our legitimate interests (website operation, fraud prevention, analytics).
            </p>

            <h2 className="text-2xl font-bold text-[#050544] mt-10 mb-4">5. Sharing and retention</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We may share data with service providers (e.g. hosting, CRM, payment or delivery partners) only where necessary. We do not sell your data. We retain personal data only for as long as needed for the purposes above or as required by law.
            </p>

            <h2 className="text-2xl font-bold text-[#050544] mt-10 mb-4">6. Your rights</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Under UK GDPR you have the right to access, rectify, erase, restrict processing, object, and data portability where applicable. You may also lodge a complaint with the ICO. To exercise your rights, contact us at{' '}
              <a href={`mailto:${siteConfig.links.email}`} className="text-[#445DFE] hover:underline">{siteConfig.links.email}</a>.
            </p>

            <h2 className="text-2xl font-bold text-[#050544] mt-10 mb-4">7. Security</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We use appropriate technical and organisational measures to protect your personal data against unauthorised access, loss or misuse.
            </p>

            <h2 className="text-2xl font-bold text-[#050544] mt-10 mb-4">8. Changes</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We may update this policy from time to time. The latest version will always be on this page. Continued use of the site after changes constitutes acceptance.
            </p>

            <p className="text-gray-600 mt-12 pt-8 border-t border-gray-200">
              <Link href="/" className="text-[#445DFE] font-semibold hover:underline">← Back to home</Link>
              {' · '}
              <Link href="/contact" className="text-[#445DFE] font-semibold hover:underline">Contact us</Link>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
