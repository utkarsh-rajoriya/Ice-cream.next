"use client";

import React from "react";
import { motion } from "framer-motion";

const Navbar = () => {
  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 1 }}
      className="fixed top-0 left-0 w-full z-50 px-6 py-6 md:px-12 flex justify-between items-center"
    >
      <div
        className="text-2xl md:text-3xl text-white cursor-pointer hover:scale-105 transition-transform"
        style={{ fontFamily: "lobster" }}
      >
        Brain Freeze.
      </div>

      <ul className="hidden md:flex space-x-10 text-white font-medium text-sm tracking-widest uppercase">
        {["Home", "Flavours", "Our Story", "Contact"].map((item, index) => (
          <li
            key={index}
            className="cursor-pointer relative group overflow-hidden"
          >
            <span className="group-hover:-translate-y-full block transition-transform duration-300">
              {item}
            </span>
            <span className="absolute top-0 left-0 translate-y-full group-hover:translate-y-0 block transition-transform duration-300 text-white/70">
              {item}
            </span>
          </li>
        ))}
      </ul>

      <div className="flex items-center space-x-6 text-white">
        <button className="hover:opacity-70 transition-opacity">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
        </button>

        <button className="relative hover:opacity-70 transition-opacity">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 5.408c.636 2.726.954 4.089.063 5.186C20.04 20.096 18.64 20.096 15.84 20.096H8.16c-2.8 0-4.2 0-5.101-.996-.892-1.097-.574-2.46.063-5.186l1.262-5.408C4.664 7.64 4.805 7.037 5.23 6.6 5.655 6.163 6.273 6.096 7.508 6.096h8.984c1.236 0 1.853.067 2.278.504.425.437.566 1.04.834 1.907Z"
            />
          </svg>

          <span className="absolute -top-1 -right-2 bg-white text-[#FF69B4] text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-lg">
            3
          </span>
        </button>

        <button className="md:hidden hover:opacity-70 transition-opacity">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-7 h-7"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 9h16.5m-16.5 6.75h16.5"
            />
          </svg>
        </button>
      </div>
    </motion.nav>
  );
};

export default Navbar;
