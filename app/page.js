import Image from "next/image";
import Banner from "./components/home/Banner";
import Portfolio from "./components/home/Portfolio";
import Footer from "./components/Footer";
import Technology from "./components/home/Technology";
import AOSWrapper from "./components/aos/AOSWrapper";

export default function Home() {
  return (
    <>
      <AOSWrapper>
        <Banner />
        <Technology />
        <Portfolio />
        <Footer />
      </AOSWrapper>
    </>
  );
}
