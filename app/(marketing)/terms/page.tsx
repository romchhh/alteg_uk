import React from 'react';
import { siteConfig } from '@/config/site';
import Link from 'next/link';

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-white pt-16 md:pt-20">
      <section className="bg-gradient-to-br from-[#050544] to-[#445DFE] text-white py-12 sm:py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 leading-tight">
              Terms of Use
            </h1>
            <p className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto">
              Terms governing your use of our website and services.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto prose prose-gray prose-lg">
            <p className="text-gray-600 mb-8">
              Last updated: {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}. 
              By using {siteConfig.name}’s website you agree to these terms.
            </p>

            <h2 className="text-2xl font-bold text-[#050544] mt-10 mb-4">1. Acceptance</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Access to and use of this website ({siteConfig.url}) and any services offered through it are subject to these Terms of Use. If you do not agree, please do not use the site.
            </p>

            <h2 className="text-2xl font-bold text-[#050544] mt-10 mb-4">2. Use of the website</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              You may use the website for lawful purposes only. You must not: use the site in any way that breaches laws or regulations; attempt to gain unauthorised access to our systems or data; transmit harmful code or content; or use the site to harass or harm others.
            </p>

            <h2 className="text-2xl font-bold text-[#050544] mt-10 mb-4">3. Products and orders</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Product information, images and prices on the site are for general guidance. We reserve the right to correct errors and to change or withdraw products. Orders are subject to availability and our acceptance. We will confirm orders and any commercial proposals separately; a contract is formed when we accept your order or quote request in writing.
            </p>

            <h2 className="text-2xl font-bold text-[#050544] mt-10 mb-4">4. Quotes and enquiries</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Submitting a contact form, quote request or wholesale enquiry does not create a binding contract. We will respond in line with our business processes. Any quote or proposal we send is valid as stated in that communication.
            </p>

            <h2 className="text-2xl font-bold text-[#050544] mt-10 mb-4">5. Intellectual property</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              All content on this website (text, images, logos, layout) is owned by or licensed to {siteConfig.name}. You may not copy, modify or use it for commercial purposes without our prior written consent.
            </p>

            <h2 className="text-2xl font-bold text-[#050544] mt-10 mb-4">6. Limitation of liability</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              The website is provided “as is”. We do not warrant that it will be uninterrupted or error-free. To the fullest extent permitted by law, we exclude liability for indirect or consequential loss arising from your use of the site. Nothing in these terms excludes our liability for death or personal injury caused by negligence or for fraud.
            </p>

            <h2 className="text-2xl font-bold text-[#050544] mt-10 mb-4">7. Links to other sites</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Our site may contain links to third-party websites. We are not responsible for their content or practices. Use of linked sites is at your own risk.
            </p>

            <h2 className="text-2xl font-bold text-[#050544] mt-10 mb-4">8. Changes and governing law</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We may update these terms at any time; the current version is always on this page. English law governs these terms and any disputes. For questions, contact us at{' '}
              <a href={`mailto:${siteConfig.links.email}`} className="text-[#445DFE] hover:underline">{siteConfig.links.email}</a>.
            </p>

            <p className="text-gray-600 mt-12 pt-8 border-t border-gray-200">
              <Link href="/" className="text-[#445DFE] font-semibold hover:underline">← Back to home</Link>
              {' · '}
              <Link href="/privacy" className="text-[#445DFE] font-semibold hover:underline">Privacy Policy</Link>
              {' · '}
              <Link href="/contact" className="text-[#445DFE] font-semibold hover:underline">Contact us</Link>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
