'use client';

import React, { useState } from 'react';

const faqs = [
  {
    question: 'Do you cut aluminium to size?',
    answer: 'Yes, we offer a free cutting service for every order, so you receive exactly the lengths you need with no waste. Simply tell us the required lengths when you place your order, and we will cut each piece to your specifications. This service is included at no extra cost and is part of our standard offering. We cut to millimetre accuracy, which helps with project planning and reduces material handling on your side. Whether you need a few pieces or hundreds of lengths, cutting to size is always included. Many of our customers choose us specifically for this convenience and the savings it brings.',
  },
  {
    question: 'What is the minimum order?',
    answer: 'We try to be flexible so that both individuals and businesses can work with us. For retail and private customers there is no set minimum order; you can order as little as you need. For trade and wholesale customers we often work with larger volumes, and we can agree terms that suit your business—whether that is a minimum by value, by weight, or by project. If you are unsure whether your order size fits our terms, please get in touch; we are happy to discuss your requirements and find an arrangement that works for both sides. We value long-term relationships and are open to special arrangements where it makes sense.',
  },
  {
    question: 'Do you work with companies and individuals?',
    answer: 'Yes, we work with both companies and individuals. Our B2B customers include construction firms, manufacturers, fabricators, furniture makers, and trade suppliers who need reliable aluminium profiles at competitive prices. We also serve B2C customers—DIY enthusiasts, small workshops, and anyone who needs quality aluminium for a one-off or occasional project. Pricing is structured to reflect order volume: larger orders benefit from our volume discounts, while smaller orders still get the same quality and service. Whatever your profile—sole trader, limited company, or private customer—we aim to provide clear communication, accurate orders, and professional service from quote to delivery.',
  },
  {
    question: 'Can I get a VAT invoice?',
    answer: 'Yes. We provide VAT invoices for all business customers who are VAT registered or who need an invoice for their records. When you place an order as a company, a VAT invoice can be issued with your company details, VAT number if applicable, and a full breakdown of the order and VAT at the standard rate. This makes it straightforward to reclaim VAT where you are entitled to do so and to keep your accounts in order. For retail customers who do not require a VAT invoice, we provide a clear receipt or confirmation that includes all the details of the purchase. If you have specific requirements for how the invoice is laid out or what information it must show, let us know and we will do our best to accommodate them.',
  },
  {
    question: 'How fast is delivery across the UK?',
    answer: 'Delivery times depend on the option you choose and your location. Our standard delivery typically takes between 2 and 5 business days across mainland UK, and we work with reliable carriers so that your order arrives in good condition and on time. If you need the order sooner, we offer an express delivery option (1–2 business days) for an additional fee; you can select this at checkout or ask us for a quote. Free delivery applies to orders over £77 (ex. VAT) to mainland UK, which helps keep costs down on larger orders. If you prefer to collect, you can arrange to pick up your order from our warehouse in Littlehampton by appointment, which is free and often the quickest way to get your materials. We will keep you informed with tracking or confirmation so you know when to expect your delivery.',
  },
  {
    question: 'Can I order non-standard profiles?',
    answer: 'Yes. We manufacture custom aluminium profiles to order, so if you cannot find what you need in our standard range, we can produce a profile to your specification. Send us a drawing, sketch, or a clear description of the cross-section, dimensions, alloy, and any special requirements (e.g. tolerances, finish, or packaging), and we will review it and come back with a quote and an indication of lead time. Custom solutions are a core part of our business: we work with engineers, designers, and fabricators who need bespoke extrusions for one-off projects or ongoing production. Once we have agreed the details and the order is confirmed, we will keep you updated on progress and deliver to the agreed schedule. Whether you need a small batch for a prototype or larger volumes for production, we are here to help.',
  },
];

const PlusIcon: React.FC<{ isOpen: boolean; className?: string }> = ({ isOpen, className = '' }) => {
  if (isOpen) {
    return (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
      </svg>
    );
  }
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
    </svg>
  );
};

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="pt-12 sm:pt-16 md:pt-20 lg:pt-24 pb-12 sm:pb-16 md:pb-20 lg:pb-24 bg-black">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4 leading-tight tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed px-2">
            Common questions about ordering from ALTEG. Can't find the answer? Contact us directly.
          </p>
        </div>

        <div className="max-w-3xl mx-auto rounded-lg overflow-hidden">
          {faqs.map((faq, index) => (
            <div key={index}>
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-4 sm:px-6 py-4 sm:py-5 bg-black hover:bg-gray-900 transition-colors flex items-center justify-between text-left group"
              >
                <span className="text-white font-medium text-sm sm:text-base md:text-lg pr-3 sm:pr-4 flex-1 leading-snug">
                  {faq.question}
                </span>
                <div className="flex-shrink-0 text-white group-hover:text-gray-300 transition-colors ml-2">
                  <PlusIcon isOpen={openIndex === index} className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
              </button>
              {openIndex === index && (
                <div className="px-4 sm:px-6 py-3 sm:py-4 bg-black border-t border-gray-800">
                  <p className="text-gray-300 text-sm sm:text-base leading-relaxed">{faq.answer}</p>
                </div>
              )}
              {/* Divider line */}
              {index < faqs.length - 1 && (
                <div className="h-px bg-gray-800"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
