"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import CommonBtn from "./utils/CommonBtn";
import { FaBarsStaggered } from "react-icons/fa6";

const Navbar = () => {
  const [show, setShow] = useState(true);

  const handleClick = () => {
    setShow(!show);
  };

  return (
    <>
      <nav className="px-11.25 py-4.5 flex items-center justify-between shadow-2xl sticky top-0">
        <div className="flex items-center gap-1.5">
          <Image
            src="/images/main.png"
            width={50}
            height={50}
            className="rounded-full"
          />
          <h3 className="text-white text-xl font-bold uppercase">Shimanto</h3>
        </div>
        <div>
          <ul className="lg:flex items-center gap-7.5 lg:gap-5 xl:gap-7.5 uppercase text-base font-medium lg:font-normal xl:font-medium text-primary hidden">
            <li className="hover:text-brand duration-300">
              <Link href="/">Iam</Link>
            </li>
            <li className="hover:text-brand duration-300">
              <Link href="/">My Experience</Link>
            </li>
            <li className="hover:text-brand duration-300">
              <Link href="/">Education</Link>
            </li>
            <li className="hover:text-brand duration-300">
              <Link href="/">Resume</Link>
            </li>
            <li className="hover:text-brand duration-300">
              <Link href="/">Portfolio</Link>
            </li>
            <li className="hover:text-brand duration-300">
              <Link href="/">Blog</Link>
            </li>
            <li className="hover:text-brand duration-300">
              <Link href="/">Contacts</Link>
            </li>
            <li>
              <CommonBtn title="hire me" />
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
                <Link href="/">Iam</Link>
              </li>
              <li className="hover:text-brand duration-300">
                <Link href="/">My Experience</Link>
              </li>
              <li className="hover:text-brand duration-300">
                <Link href="/">Education</Link>
              </li>
              <li className="hover:text-brand duration-300">
                <Link href="/">Resume</Link>
              </li>
              <li className="hover:text-brand duration-300">
                <Link href="/">Portfolio</Link>
              </li>
              <li className="hover:text-brand duration-300">
                <Link href="/">Blog</Link>
              </li>
              <li className="hover:text-brand duration-300">
                <Link href="/">Contacts</Link>
              </li>
              <li className="hidden lg:block">
                <CommonBtn title="hire me" />
              </li>
            </ul>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
