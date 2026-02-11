import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { metadata as siteMetadata } from "@/config/site";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = siteMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="trustpilot-one-time-domain-verification-id" content="329f36ce-3444-40ad-a751-f8736efedd12" />
      </head>
      <body
        className={`${montserrat.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
