import Image from "next/image";
import Link from "next/link";
import React from "react";
import { BiLinkExternal } from "react-icons/bi";
import { FaFacebookF, FaGithub, FaLinkedinIn } from "react-icons/fa6";

const Footer = () => {
  return (
    <div>
      <footer id="contact" className="mb-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-sm font-medium text-brand font-montserrat leading-[14px]">
              Contact
            </p>
            <h2 className="text-5xl font-bold font-montserrat text-primary leading-[72px] mt-3">
              Contact With Me
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="bg-[#212428] p-8 rounded-xl shadow-[10px_10px_19px_#1c1e22,-10px_-10px_19px_#262a2e]">
              <div className="rounded-lg overflow-hidden">
                <Image
                  src="/images/contact1.png"
                  alt="Shimanto"
                  className="w-full rounded-lg h-70"
                  width={500}
                  height={50}
                />
              </div>
              <h3 className="text-[29px] font-bold text-[#E4E6EA] leading-[44px] mt-10 mb-2">
                Shimanto
              </h3>
              <h5 className="text-[18px] text-[#878E99] font-poppins mb-2">
                Phone:
                <span className="relative hover:text-brand after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 hover:after:w-full after:h-[1px] after:bg-brand after:transition-all after:duration-300 transition-all duration-300">
                  +8801750658101
                </span>
              </h5>
              <h5 className="text-[18px] text-[#878E99] font-poppins mb-2">
                Email:
                <span className="relative hover:text-brand after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 hover:after:w-full after:h-[1px] after:bg-brand after:transition-all after:duration-300 transition-all duration-300">
                  shimanto.dev.bd@gmail.com
                </span>
              </h5>

              <p className="mt-10 mb-6 text-lg text-primary font-poppins">
                FIND WITH ME
              </p>
              <div className="flex gap-6">
                <Link
                  href="https://www.facebook.com/iamshimanto18"
                  target="_blank"
                  className="w-[60px] h-[60px] flex items-center justify-center rounded-md text-primary text-lg bg-gradient-to-r from-[#1E2024] to-[#23272B] shadow-md transition duration-300 hover:-translate-y-1 hover:bg-black/10"
                >
                  <FaFacebookF />
                </Link>
                <Link
                  href="https://github.com/iamShimanto"
                  target="_blank"
                  className="w-[60px] h-[60px] flex items-center justify-center rounded-md text-primary text-lg bg-gradient-to-r from-[#1E2024] to-[#23272B] shadow-md transition duration-300 hover:-translate-y-1 hover:bg-black/10"
                >
                  <FaGithub />
                </Link>
                <Link
                  href="https://www.linkedin.com/in/iam-shimanto/"
                  target="_blank"
                  className="w-[60px] h-[60px] flex items-center justify-center rounded-md text-primary text-lg bg-gradient-to-r from-[#1E2024] to-[#23272B] shadow-md transition duration-300 hover:-translate-y-1 hover:bg-black/10"
                >
                  <FaLinkedinIn />
                </Link>
              </div>
            </div>

            <div className="p-8 rounded-xl shadow-[10px_10px_19px_#1c1e22,-10px_-10px_19px_#262a2e] bg-transparent">
              <form className="space-y-5">
                <div className="flex flex-col sm:flex-row gap-5">
                  <div className="flex-1">
                    <p className="uppercase text-xs tracking-wide text-primary font-medium mb-1">
                      Your Name
                    </p>
                    <input
                      type="text"
                      className="w-full h-[55px] bg-[#191B1E] text-primary px-4 rounded-lg outline-none focus:ring-2 focus:ring-brand transition-all duration-200"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="uppercase text-xs tracking-wide text-primary font-medium mb-1">
                      Phone Number
                    </p>
                    <input
                      type="text"
                      className="w-full h-[55px] bg-[#191B1E] text-primary px-4 rounded-lg outline-none focus:ring-2 focus:ring-brand transition-all duration-200"
                    />
                  </div>
                </div>

                <div className="mt-10">
                  <p className="uppercase text-xs tracking-wide text-primary font-medium mb-1">
                    Email
                  </p>
                  <input
                    type="email"
                    className="w-full h-[55px] bg-[#191B1E] text-primary px-4 rounded-lg outline-none focus:ring-2 focus:ring-brand transition-all duration-200"
                  />
                </div>

                <div className="mt-10">
                  <p className="uppercase text-xs tracking-wide text-primary font-medium mb-1">
                    Your Message
                  </p>
                  <textarea className="w-full h-[235px] bg-[#191B1E] text-primary p-4 rounded-lg outline-none focus:ring-2 focus:ring-brand transition-all duration-200"></textarea>
                </div>

                <button
                  type="submit"
                  className="mt-10 w-full py-4 flex justify-center items-center gap-2 text-brand uppercase text-sm font-medium font-poppins rounded-lg bg-gradient-to-br from-[#1e2024] to-[#23272b] shadow-[10px_10px_19px_#1c1e22,-10px_-10px_19px_#262a2e] hover:-translate-y-2 hover:bg-black/10 transition-all duration-300"
                >
                  Send Message <i className="fa-solid fa-arrow-right"></i>
                </button>
              </form>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
