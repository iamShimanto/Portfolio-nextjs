import Image from "next/image";
import Banner from "./components/home/Banner";
import Portfolio from "./components/home/Portfolio";
import Footer from "./components/Footer";
import Technology from "./components/home/Technology";
import AOSWrapper from "./components/aos/AOSWrapper";

function JsonLd({ data }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}


export default function Home() {
  return (
    <main>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Shimanto",
          url: "https://shimanto.dev",
          jobTitle: "Full Stack Web Developer",
          sameAs: [
            "https://github.com/iamshimanto",
            "https://www.facebook.com/iamshimanto18",
            "https://www.linkedin.com/in/iam-shimanto/",
          ],
          knowsAbout: [
            "Next.js",
            "React",
            "Node.js",
            "Express",
            "MongoDB",
            "Tailwind CSS",
            "MERN",
          ],
        }}
      />

      <AOSWrapper>
        <Banner />
        <Technology />
        <Portfolio />
        <Footer />
      </AOSWrapper>
    </main>
  );
}
