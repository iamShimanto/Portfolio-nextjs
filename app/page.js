import Image from "next/image";
import Banner from "./components/home/Banner";
import Features from "./components/home/Features";
import Portfolio from "./components/home/Portfolio";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <Banner/>
      <Features />
      <Portfolio />
      <Footer />
    </>
  );
}
