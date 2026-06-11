import "./globals.css";
import ConditionalNavbar from "./components/ConditionalNavbar";
import { Toaster } from "react-hot-toast";
import { Analytics } from "@vercel/analytics/next";
import { AuthProvider } from "./context/AuthContext";

export const metadata = {
  metadataBase: new URL("https://shimanto.dev"),
  title: {
    default: "Shimanto Sarkar – Full Stack Developer | Portfolio",
    template: "%s | Shimanto Sarkar",
  },
  description:
    "Portfolio of Shimanto Sarkar — Full Stack Web Developer specializing in Next.js, Node.js, and MongoDB.",
  keywords: [
    "Shimanto Sarkar",
    "Full Stack Developer",
    "Next.js Developer",
    "Node.js Developer",
    "MERN Stack",
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
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body>
        <AuthProvider>
          <Toaster position="top-right" reverseOrder={false} />
          <ConditionalNavbar />
          {children}
          <Analytics />
        </AuthProvider>
      </body>
    </html>
  );
}
