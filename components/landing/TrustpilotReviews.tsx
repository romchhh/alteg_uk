'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { siteConfig } from '@/config/site';

/** Hardcoded Trustpilot data — real rating, count and review from alteg.co.uk */
const TRUSTPILOT_RATING = 3.5;
const TRUSTPILOT_DISPLAY_SCORE = 3.7;
const TRUSTPILOT_TOTAL_REVIEWS = 1;

const TRUSTPILOT_REVIEW = {
  initials: 'АС',
  stars: 5,
  text: 'Bought aluminium angle bars from Altec UK — three 6-meter, two 3-meter, and one 1-meter piece. Total was £89. Everything was done properly: delivery was on time (within two days), well packed, no scratches or damage. Now I have a nice little fence in my garden. Very happy with the quality and service. Would definitely recommend this company. Well done and thank you!',
  author: 'Александр Саламатин',
  location: 'GB',
  createdAtRelative: '5 days ago',
};

const StarIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={`${className} text-yellow-400 fill-current`} viewBox="0 0 20 20">
    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
  </svg>
);

export const TrustpilotReviews: React.FC = () => {
  if (!siteConfig.links.trustpilot) {
    return (
      <div className="bg-white rounded-xl p-6 sm:p-8 text-center">
        <span className="text-gray-600">Trustpilot — Coming soon</span>
      </div>
    );
  }

  return (
    <Link
      href={siteConfig.links.trustpilot}
      target="_blank"
      rel="noopener noreferrer"
      className="block bg-white rounded-xl p-6 sm:p-8 hover:shadow-2xl transition-all duration-300"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="relative w-24 h-8 flex-shrink-0">
          <Image
            src="/trust-pilot-stacked-black.svg"
            alt="Trustpilot"
            fill
            className="object-contain"
            sizes="96px"
          />
        </div>
        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      </div>

      {/* Single review */}
      <div className="border-t border-gray-200 pt-6">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-semibold text-lg">
              {TRUSTPILOT_REVIEW.initials}
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <div className="flex items-center gap-1">
                {[...Array(TRUSTPILOT_REVIEW.stars)].map((_, i) => (
                  <StarIcon key={i} />
                ))}
              </div>
              <span className="text-xs text-gray-500">{TRUSTPILOT_REVIEW.createdAtRelative}</span>
            </div>
            <p className="text-gray-900 text-sm sm:text-base mb-2 leading-relaxed">
              {TRUSTPILOT_REVIEW.text}
            </p>
            <p className="text-sm font-medium text-gray-700">
              {TRUSTPILOT_REVIEW.author}
              {TRUSTPILOT_REVIEW.location && (
                <span className="text-gray-500 font-normal"> • {TRUSTPILOT_REVIEW.location}</span>
              )}
            </p>
          </div>
        </div>
      </div>

      {/* Footer — real TrustScore and count */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="text-center space-y-2">
          <div className="text-base sm:text-lg font-bold text-gray-900">
            TrustScore {TRUSTPILOT_DISPLAY_SCORE}/5 • {TRUSTPILOT_TOTAL_REVIEWS.toLocaleString()} review{TRUSTPILOT_TOTAL_REVIEWS !== 1 ? 's' : ''}
          </div>
          <p className="text-xs text-gray-600">Rated {TRUSTPILOT_RATING} out of 5 on Trustpilot</p>
        </div>
      </div>
    </Link>
  );
};
