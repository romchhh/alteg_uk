import Link from "next/link";
import React from "react";

const Chevron = () => (
  <svg width="17" height="16" viewBox="0 0 17 16" fill="none" className="shrink-0">
    <path
      d="M6.0765 12.667L10.2432 8.50033L6.0765 4.33366"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export interface BreadcrumbSegment {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  pageTitle: string;
  segments?: BreadcrumbSegment[];
}

const PageBreadcrumb: React.FC<BreadcrumbProps> = ({ pageTitle, segments = [] }) => {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
      <h2 className="text-xl font-semibold text-gray-900">
        {pageTitle}
      </h2>
      <nav aria-label="Breadcrumb">
        <ol className="flex items-center gap-1.5 flex-wrap">
          <li>
            <Link
              className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700"
              href="/admin"
            >
              Dashboard
              <Chevron />
            </Link>
          </li>
          {segments.length === 0 ? (
            <li className="flex items-center gap-1.5">
              <Chevron />
              <span className="text-sm text-gray-900">{pageTitle}</span>
            </li>
          ) : (
            segments.map((seg) => (
              <li key={seg.label} className="flex items-center gap-1.5">
                <Chevron />
                {seg.href ? (
                  <Link
                    className="text-sm text-gray-500 hover:text-gray-700"
                    href={seg.href}
                  >
                    {seg.label}
                  </Link>
                ) : (
                  <span className="text-sm text-gray-900">{seg.label}</span>
                )}
              </li>
            ))
          )}
        </ol>
      </nav>
    </div>
  );
};

export default PageBreadcrumb;
