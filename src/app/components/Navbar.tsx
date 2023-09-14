"use client";
import Link from "next/link";
import React from "react";

const Navbar = (props: any) => {
  return (
      <nav className="bg-gray-200 border-gray-200 dark:bg-gray-700 p-2">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto py-1 mt-1">
          <a href="/" className="flex items-center">
            <img
              src="/fss.svg"
              className="h-8 mr-2 sm:h-10" 
              alt="Logo"
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              Growthfyi
            </span>
          </a>
        </div>
      </nav>
  );
};

export default Navbar;
