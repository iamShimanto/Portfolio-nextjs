import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FaFacebookF,
  FaFigma,
  FaGithub,
  FaInvision,
  FaLinkedinIn,
  FaRegGem,
} from "react-icons/fa6";

const Banner = () => {
  return (
    <>
      <section id="iam" className="py-19 banner">
        <div className="container">
          <div className="flex flex-col xl:flex-row justify-between items-center gap-7.5 xl:px-10">
            <div>
              <div className="sm:p-15 duration-300 rounded-2xl">
                <div className="text-main_colo">
                  <h4 className="text-xl mb-5">Welcome to my world</h4>
                </div>

                <h1 className="title leading-15 text-3xl sm:text-6xl text-white ">
                  Hi, I’m <span className="!text-brand">Shimanto</span>
                  <br />
                  <span className="header-caption" id="page-top">
                    <span className="cd-headline clip is-full-width flex items-center gap-5 mt-4">
                      <span className="aa text-2xl sm:text-5xl md:text-6xl">
                        a{" "}
                      </span>

                      <span className="cd-words-wrapper text-2xl sm:text-5xl md:text-6xl">
                        <b className="is-visible">Developer.</b>
                        <b className="is-hidden">Professional Coder.</b>
                        <b className="is-hidden">Developer.</b>
                      </span>
                    </span>
                  </span>
                </h1>

                <p className="text-main_colo max-w-[660px] leading-7 tracking-widest mt-10">
                  I use animation as Link third dimension by which to simplify
                  experiences and kuiding thro each and every interaction.
                  I’mnot adding motion just to spruce things up, but doing it in
                  ways that.
                </p>
                <div className="botton_card mt-25 text-main_colo flex flex-col items-center justify-between gap-5 md:flex-row">
                  <div className="left_side">
                    <h5>find with me</h5>
                    <div className="icon">
                      <Link
                        href="https://www.facebook.com/iamshimanto18"
                        target="_blank"
                      >
                        <FaFacebookF />
                      </Link>
                      <Link
                        href="https://github.com/iamShimanto"
                        target="_blank"
                      >
                        <FaGithub />
                      </Link>
                      <Link
                        href="https://www.linkedin.com/in/iam-shimanto/"
                        target="_blank"
                      >
                        <FaLinkedinIn />
                      </Link>
                    </div>
                  </div>
                  <div className="left_side">
                    <h5>best skill on</h5>
                    <div className="icon">
                      <Link href="#">
                        <FaInvision className="invision" />
                      </Link>
                      <Link href="#">
                        <FaRegGem className="diamond" />
                      </Link>
                      <Link href="#">
                        <FaFigma className="figma" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="card rounded-2xl h-[480px] sm:h-[650px] p-7.5 overflow-hidden">
              <Image
                src="/images/main.png"
                width={500}
                height={400}
                className="scale-110"
                alt="main-iamge"
              />
            </div>
          </div>
        </div>

        <script src="/js/jquery-1.12.4.min.js"></script>
        <script src="/js/text-type.js"></script>
      </section>
    </>
  );
};

export default Banner;
