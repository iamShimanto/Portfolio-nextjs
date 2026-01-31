import "./globals.css";
import Navbar from "./components/Navbar";
import Script from "next/script";
import { Toaster } from "react-hot-toast";
import { Analytics } from "@vercel/analytics/next";

export const metadata = {
  metadataBase: new URL("https://shimanto.dev"),
  title: "Shimanto – Full Stack MERN Developer | React, Node.js, MongoDB",
  description:
    "I’m Shimanto Sarkar, a full stack web developer specializing in Next.js, Node.js, and MongoDB.",
  keywords: [
    "Shimanto Sarkar",
    "Full Stack Developer",
    "Next.js",
    "Portfolio",
    "Web Developer Bangladesh",
    "iamshimanto",
    "shimanto dev",
    "shimanto full stack developer",
    "shimanto portfolio",
    "shimanto backend developer",
    "website developer bangladesh",
    "shimanto.dev",
    "shimanto mern stack developer",
    "shimanto web developer",
  ],
  other: {
    "google-site-verification": "-tvqxNUbPqTjeZD-q8IhL7_Amgf4hfoJjJ7nRxOayG8",
  },
  openGraph: {
    title: "Shimanto – Full Stack MERN Developer | React, Node.js, MongoDB",
    description:
      "Portfolio of Shimanto Sarkar — Full Stack Web Developer from Bangladesh.",
    url: "https://shimanto.dev",
    siteName: "Shimanto Sarkar",
    images: [
      {
        url: "https://shimanto.dev/images/main.webp",
        width: 1200,
        height: 630,
        alt: "Shimanto Sarkar Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shimanto Sarkar | Full Stack Developer",
    description:
      "Portfolio of Shimanto Sarkar — Next.js developer from Bangladesh.",
    images: ["https://shimanto.dev/images/main.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({ children }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Shimanto Sarkar",
    url: "https://shimanto.dev",
    jobTitle: "Full Stack Developer",
    sameAs: [
      "https://www.linkedin.com/in/iam-shimanto",
      "https://github.com/iamShimanto",
    ],
  };
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <Script
          id="schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      </head>
      <body>
        <Toaster position="top-right" reverseOrder={false} />
        <Navbar />
        {children}
        <Analytics />
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-JEVHP8E9R5"
        />
        <Script id="ga">
          {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-JEVHP8E9R5');
  `}
        </Script>
      </body>
    </html>
  );
}
