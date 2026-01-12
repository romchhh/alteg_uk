'use client';

import React, { useState } from 'react';

const faqs = [
  {
    question: 'Do you cut aluminium to size?',
    answer: 'Yes, we offer free cutting service for all orders. Simply specify the lengths you need when placing your order. This is our standard service included at no extra cost.',
  },
  {
    question: 'What is the minimum order?',
    answer: 'There is no minimum order for retail customers. For wholesale customers, we typically require a minimum order value of £500 or 100kg. Contact us for special arrangements.',
  },
  {
    question: 'Do you work with companies and individuals?',
    answer: 'Yes, we work with both B2B and B2C customers. We serve construction companies, manufacturers, furniture makers, and private customers. We offer different pricing tiers based on order volume.',
  },
  {
    question: 'Can I get a VAT invoice?',
    answer: 'Yes, we provide VAT invoices for all business customers. VAT invoices are automatically generated for company orders. For retail customers, standard receipts are provided.',
  },
  {
    question: 'How fast is delivery across the UK?',
    answer: 'Standard delivery takes 2-5 business days across the UK. Express delivery (1-2 days) is available for an additional fee. Collection from our warehouse is also possible by appointment. Free delivery on orders over £30.',
  },
  {
    question: 'Can I order non-standard profiles?',
    answer: 'Yes, we manufacture custom profiles to order. Send us a drawing or detailed description of your requirements, and we will provide a quote and manufacturing timeline. Custom solutions are our specialty.',
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
