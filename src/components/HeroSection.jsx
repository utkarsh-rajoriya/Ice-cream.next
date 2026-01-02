"use client";

import React, { useState } from "react";
import CreameDriping from "./effects/CreameDriping";
import Image from "next/image";
import { motion } from "framer-motion";
import Navbar from "./Navbar";

const HeroSection = () => {
  const [dripFinished, setDripFinished] = useState(false);
  const [current, setCurrent] = useState(0);

  const IceCreams = [
    {
      flavour: "Strawberry",
      title: "Made from fresh garden strawberries",
      description:
        "Sweet, sun-ripened strawberries are crushed and folded into our signature sweet cream base. A blushing pink masterpiece.",
      price: 19.2,
      image: "/icecreams/strawberry-cream.png",
      cream: "#C53030",
      bg: "#BC323A",
    },
    {
      flavour: "Vanilla",
      title: "Made from Madagascar vanilla beans",
      description:
        "Experience the pure essence of elegance with our Madagascan Vanilla. Sourced from the finest orchids, every scoop offers a rich, floral aroma and a velvety texture.",
      price: 11.9,
      image: "/icecreams/vanilla-cream.png",
      cream: "#80734d",
      bg: "#EBD094",
    },
    {
      flavour: "Chocolate",
      title: "Made from premium Belgian cocoa",
      description:
        "Dive into deep indulgence with premium Belgian cocoa. A dark, velvety journey through bittersweet notes, finished with a creamy sweetness.",
      price: 16.5,
      image: "/icecreams/chocolate-cream.png",
      cream: "#5D4037",
      bg: "#38241E",
    },
    {
      flavour: "Blueberry",
      title: "Made from hand picked blueberries",
      description:
        "Bursting with the antioxidant-rich goodness of hand-picked mountain blueberries. A vibrant, tangy swirl cuts through the sweet cream.",
      price: 20.9,
      image: "/icecreams/blueberry-cream.png",
      cream: "#2C5282",
      bg: "#2F1F42",
    },
    {
      flavour: "Mango",
      title: "Made from juicy Alphonso mangoes",
      description:
        "Transport your senses to the tropics with the golden nectar of Alphonso mangoes. Smooth, luscious, and intensely aromatic.",
      price: 12.5,
      image: "/icecreams/mango-cream.png",
      cream: "#DD6B20",
      bg: "#AB4705",
    },
  ];

  const handleNext = () => {
    setCurrent((prev) => (prev + 1) % IceCreams.length);
  };

  const handlePrev = () => {
    setCurrent((prev) => (prev - 1 + IceCreams.length) % IceCreams.length);
  };

  return (
    <div className="relative overflow-hidden h-screen w-full bg-[#FF69B4]">
      {/* Background Drip */}
      <div className="absolute z-0 w-full h-full min-h-screen">
        <CreameDriping
          color={IceCreams[current].bg}
          speed={1}
          onComplete={() => setDripFinished(true)}
        />
      </div>

      {/* 1. Add Navbar Here */}
      <Navbar />

      {/* MAIN GRID */}
      {/* Changed grid-cols-1 to use absolute positioning on mobile for side columns */}
      <div className="absolute max-md:mt-5 z-10 h-full w-full grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr]">
        {/* =========================================
            Column-1: FLAVOUR & PRICE (Left Side)
           ========================================= */}
        {/* Mobile: Absolute Top | Desktop: Relative Left Grid */}
        <div className="absolute top-0 left-0 w-full lg:static lg:w-auto h-auto lg:h-full flex flex-col justify-start lg:justify-between p-6 pt-10 lg:pt-32 lg:pb-16 lg:pl-12 z-40 pointer-events-none">
          {/* Top Section: Flavour Name */}
          <div className="pointer-events-auto">
            <motion.div
              key={`info-${current}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <span className="text-white/80 uppercase tracking-widest text-xs lg:text-sm font-bold shadow-black/10 drop-shadow-md">
                Premium Selection
              </span>
              <h2 className="text-5xl lg:text-7xl font-extrabold text-white leading-tight mt-1 lg:mt-2 drop-shadow-lg">
                {IceCreams[current].flavour}
              </h2>
              <p className="text-white/95 text-lg lg:text-xl font-medium mt-2 lg:mt-4 max-w-xs drop-shadow-md">
                {IceCreams[current].title}
              </p>
            </motion.div>
          </div>

          {/* Price (Hidden on mobile to save space, or remove 'hidden' to show under title) */}
          {/* Currently showing on Desktop at bottom, Mobile at top under title */}
          <motion.div
            className="mt-4 lg:mt-0 pointer-events-auto flex items-center gap-6" // Added flex & gap to align price and button
            key={`price-${current}`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <span className="text-4xl lg:text-6xl font-bold text-white drop-shadow-lg">
              ${IceCreams[current].price}
            </span>

            <button
              className="px-8 py-3 rounded-full bg-white text-[#FF69B4] font-bold text-lg hover:scale-105 transition-transform shadow-xl"
              onClick={() => console.log("Buy clicked")}
            >
              Buy Now
            </button>
          </motion.div>
        </div>

        {/* =========================================
            Column-2: THE STAGE (Center)
           ========================================= */}
        <div className="relative w-full h-full flex justify-center items-center">
          <div className="relative flex justify-between gap-5 space-x-2.5 items-center">
            {/* 1. TEXT: ICE */}
            <motion.h1
              className="absolute left-[-3rem] md:left-[-5rem] lg:left-[-9rem] mb-[6rem] text-[7rem] md:text-[10rem] lg:text-[13rem] font-bold whitespace-nowrap z-0 select-none bg-gradient-to-b from-white to-white/20 bg-clip-text text-transparent blur-[1px]"
              style={{ fontFamily: "lobster" }}
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: "25%", opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              ICE
            </motion.h1>

            {/* 2. IMAGES CENTER */}
            <div className="relative w-[25rem] h-[35rem] md:w-[40rem] md:h-[50rem] lg:w-[45rem] lg:h-[52rem]">
              {/* Back Image */}
              <motion.div
                className="absolute top-0 left-0 w-full h-full z-10"
                key={`back-${current}`}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={
                  dripFinished
                    ? { scale: 1, opacity: 1, x: -70, rotate: -10 }
                    : { scale: 0.8, opacity: 1, x: 0, rotate: 0 }
                }
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <Image
                  src={IceCreams[current].image}
                  alt="Ice cream back"
                  fill
                  className="object-contain drop-shadow-2xl grayscale-[30%]"
                  priority
                />
              </motion.div>

              {/* Front Image */}
              <motion.div
                className="relative w-full h-full z-20"
                key={`front-${current}`}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={
                  dripFinished
                    ? { scale: 1.1, opacity: 1, x: 50, rotate: 8 }
                    : { scale: 1, opacity: 1, x: 0, rotate: 0 }
                }
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <Image
                  src={IceCreams[current].image}
                  alt="Ice cream front"
                  fill
                  className="object-contain drop-shadow-2xl"
                  priority
                />
              </motion.div>
            </div>

            {/* 3. TEXT: CREAM */}
            <motion.h1
              className="absolute right-[-7rem] md:right-[-10rem] lg:right-[-30rem] mt-[16rem] md:mt-[20rem] text-[6rem] md:text-[8rem] lg:text-[13rem] font-bold whitespace-nowrap z-20 bg-gradient-to-b from-white to-white/50 bg-clip-text text-transparent blur-[1px]"
              style={{ fontFamily: "lobster" }}
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: "-25%", opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              CREAM
            </motion.h1>
          </div>
        </div>

        {/* =========================================
            Column-3: DESCRIPTION & NAV (Right Side)
           ========================================= */}
        {/* Mobile: Absolute Bottom | Desktop: Relative Right Grid */}
        <div className="absolute bottom-0 right-0 w-full lg:static lg:w-auto h-auto lg:h-full flex flex-col justify-end p-6 pb-10 lg:pb-16 lg:pr-12 z-40 pointer-events-none">
          <div className="flex flex-col items-center lg:items-end text-center lg:text-right pointer-events-auto">
            {/* Description */}
            <motion.div
              key={`desc-${current}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-black/10 lg:bg-transparent lg:mb-50  p-4 lg:p-0 rounded-2xl backdrop-blur-sm lg:backdrop-blur-none"
            >
              <h3 className="text-white font-bold text-xl lg:text-2xl mb-1 lg:mb-3">
                Description
              </h3>
              <p className="text-white/90 text-sm lg:text-lg leading-relaxed max-w-xs lg:max-w-sm ml-auto mr-auto lg:mr-0">
                {IceCreams[current].description}
              </p>
            </motion.div>

            {/* Navigation Buttons */}
            <div className="flex gap-4 mt-6 lg:mt-10">
              <button
                onClick={handlePrev}
                className="w-12 h-12 lg:w-16 lg:h-16 rounded-full bg-white/10 hover:bg-white/30 backdrop-blur-md flex items-center justify-center text-white transition-all border border-white/40 hover:scale-110 active:scale-95"
              >
                <span className="text-xl lg:text-2xl">&#8592;</span>
              </button>

              <button
                onClick={handleNext}
                className="w-12 h-12 lg:w-16 lg:h-16 rounded-full bg-white/10 hover:bg-white/30 backdrop-blur-md flex items-center justify-center text-white transition-all border border-white/40 hover:scale-110 active:scale-95"
              >
                <span className="text-xl lg:text-2xl">&#8594;</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
