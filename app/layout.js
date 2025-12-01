import "./globals.css";
import Navbar from "./components/Navbar";
import Script from "next/script";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "Shimanto Sarkar | Full Stack Developer",
  description:
    "I’m Shimanto Sarkar, a full stack web developer specializing in Next.js, Node.js, and MongoDB.",
  keywords: [
    "Shimanto Sarkar",
    "Full Stack Developer",
    "Next.js",
    "Portfolio",
    "Web Developer Bangladesh",
  ],
  other: {
    "google-site-verification": "-tvqxNUbPqTjeZD-q8IhL7_Amgf4hfoJjJ7nRxOayG8",
  },
  openGraph: {
    title: "Shimanto Sarkar | Full Stack Developer",
    description:
      "Portfolio of Shimanto Sarkar — Full Stack Web Developer from Bangladesh.",
    url: "https://iamshimanto.vercel.app",
    siteName: "Shimanto.cloud",
    images: [
      {
        url: "https://iamshimanto.vercel.app/images/main.png",
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
    images: ["https://iamshimanto.vercel.app/images/main.png"],
  },
};

export default function RootLayout({ children }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Shimanto Sarkar",
    url: "https://iamshimanto.vercel.app",
    jobTitle: "Full Stack Developer",
    sameAs: [
      "https://www.linkedin.com/in/iam-shimanto",
      "https://github.com/iamShimanto",
    ],
  };
  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          href="/icon?<generated>"
          type="image/<generated>"
          sizes="<generated>"
        />
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
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-9RR7EJZNYQ"
        />
        <Script id="ga">
          {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-9RR7EJZNYQ');
  `}
        </Script>
      </body>
    </html>
  );
}
