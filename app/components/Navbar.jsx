"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import CommonBtn from "./utils/CommonBtn";
import { FaBarsStaggered } from "react-icons/fa6";

const Navbar = () => {
  const [show, setShow] = useState(false);

  const handleClick = () => {
    setShow(!show);
  };
  
  console.log("issue")

  return (
    <>
      <nav className="px-11.25 py-4.5 flex items-center justify-between shadow-2xl bg-[#212428] sticky top-0 z-50">
        <Link href={"/"} className="flex items-center gap-1.5">
          <Image
            src="/images/main.png"
            width={50}
            height={50}
            className="rounded-full"
            alt="logo"
          />
          <h3 className="text-white text-xl font-bold uppercase">Shimanto</h3>
        </Link>
        <div>
          <ul className="lg:flex items-center gap-7.5 lg:gap-5 xl:gap-7.5 uppercase text-base font-medium lg:font-normal xl:font-medium text-primary hidden">
            <li className="hover:text-brand duration-300">
              <Link href="#iam">Iam</Link>
            </li>
            <li className="hover:text-brand duration-300">
              <Link href="#technology">My Experience</Link>
            </li>
            <li className="hover:text-brand duration-300">
              <Link href="#portfolio">Portfolio</Link>
            </li>
            <li className="hover:text-brand duration-300">
              <Link href="#contact">Contacts</Link>
            </li>
            <li>
              <CommonBtn link="#contact" title="hire me" />
            </li>
          </ul>
        </div>

        <div className="relative lg:hidden">
          <FaBarsStaggered
            className="text-3xl text-primary cursor-pointer"
            onClick={handleClick}
          />
          {show && (
            <ul className="flex flex-col items-center gap-7.5 lg:gap-5 xl:gap-7.5 uppercase text-base font-medium lg:font-normal xl:font-medium text-primary absolute right-0 top-15 bg-gray-600 w-60 py-10 rounded-xl">
              <li className="hover:text-brand duration-300">
                <Link href="#iam">Iam</Link>
              </li>
              <li className="hover:text-brand duration-300">
                <Link href="#technology">My Experience</Link>
              </li>
              <li className="hover:text-brand duration-300">
                <Link href="#portfolio">Portfolio</Link>
              </li>
              <li className="hover:text-brand duration-300">
                <Link href="#contact">Contacts</Link>
              </li>
              <li className="hidden lg:block">
                <CommonBtn link="#contact" title="hire me" />
              </li>
            </ul>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
