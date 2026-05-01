import Link from "next/link";
import React from "react";

const CommonBtn = ({ link = "/", title }) => {
  return (
    <>
      <Link
        href={link}
        className="py-3 px-3 sm:py-4.5 sm:px-9 w-fit shadow-sm shadow-slate-50 text-brand uppercase font-medium hover:bg-black hover:shadow-none commonBtn ease-in-out duration-300 rounded-lg card"
      >
        {title}
      </Link>
    </>
  );
};

export default CommonBtn;
