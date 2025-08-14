import React from "react";
import { MdOutlineEmail, MdOutlinePerson3 } from "react-icons/md";
import { FaLocationDot, FaRegNoteSticky } from "react-icons/fa6";
import CommonBtn from "../utils/CommonBtn";
import Image from "next/image";

const Banner = () => {
  return (
    <>
      <section id="iam" className="py-19">
        <div className="container">
          <div className="flex flex-col lg:flex-row justify-center items-center gap-7.5">
            <div>
              <div className="p-15 card commonBtn duration-300 rounded-2xl">
                <div className="text-2xl p-4 bg-brand rounded-full text-primary font-bold w-fit">
                  <MdOutlinePerson3 />
                </div>
                <h1 className="text-3xl sm:text-[52px] font-bold text-brand py-2.5">
                  <span className="text-primary">Hi, I’m</span> Shimanto
                </h1>
                <p className="text-base font-normal text-primary max-w-81">
                  Web designer and developer working for envato.com in Paris,
                  France.
                </p>
                <ul className="my-8.5 flex flex-col gap-2">
                  <li className="flex items-center gap-3 text-primary font-medium">
                    <FaRegNoteSticky className="text-2xl text-brand rotate-270" />{" "}
                    Web Designer & Developer
                  </li>
                  <li className="flex items-center gap-3 text-primary font-medium">
                    <MdOutlineEmail className="text-2xl text-brand" />{" "}
                    shimanto.dev.bd@gmail.com
                  </li>
                  <li className="flex items-center gap-3 text-primary font-medium">
                    <FaLocationDot className="text-2xl text-brand" /> Uttara,
                    Dhaka 1230
                  </li>
                </ul>
              </div>
              <div className="card py-6 px-7.5 rounded-2xl mt-7.5">
                <p className="text-primary">Download my curriculum vitae:</p>
                <div className="flex gap-4 mt-6">
                  <CommonBtn title="download cv" />
                  <CommonBtn title="contact me" />
                </div>
              </div>
            </div>
            <div className="card rounded-2xl h-[480px] sm:h-[650px] p-7.5 overflow-hidden">
              <Image
                src="/images/main.png"
                width={500}
                height={400}
                className="scale-110"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Banner;
