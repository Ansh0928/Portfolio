import type { Metadata } from "next";
import { meta, contact } from "@/lib/data";
import "./globals.css";

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  metadataBase: new URL(meta.url),
  openGraph: {
    title: meta.title,
    description: meta.description,
    url: meta.url,
    siteName: meta.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: meta.title,
    description: meta.description,
  },
};

// JSON-LD Person schema
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: meta.name,
  jobTitle: meta.jobTitle,
  url: meta.url,
  email: contact.email,
  sameAs: [contact.github, contact.linkedin],
  knowsAbout: meta.knowsAbout,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Gold Coast",
    addressCountry: "AU",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-[#0d1117] text-[#e6edf3] antialiased">
        {children}
      </body>
    </html>
  );
}
