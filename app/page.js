import Image from "next/image";
import Banner from "./components/home/Banner";
import Features from "./components/home/Features";
import Portfolio from "./components/home/Portfolio";
import Footer from "./components/Footer";
import Technology from "./components/home/Technology";

export default function Home() {
  return (
    <>
      <Banner/>
      <Technology />
      <Portfolio />
      <Footer />
    </>
  );
}
