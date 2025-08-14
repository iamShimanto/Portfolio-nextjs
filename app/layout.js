import "./globals.css";
import Navbar from "./components/Navbar";



export const metadata = {
  title: "Shimanto Sarkar | Full Stack Developer (MERN)",
  description:
    "Shimanto Sarkar - Full Stack MERN Developer specializing in React, Node.js, MongoDB & Next.js. Building scalable web apps with modern JavaScript and TypeScript.",
  keywords: [
    "Shimanto Sarkar",
    "Full Stack Developer",
    "MERN Stack",
    "React Developer",
    "Node.js Developer",
    "Next.js",
    "MongoDB",
    "TypeScript",
    "JavaScript",
    "Web Development",
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className=""
      >
        <Navbar/>
        {children}
      </body>
    </html>
  );
}
