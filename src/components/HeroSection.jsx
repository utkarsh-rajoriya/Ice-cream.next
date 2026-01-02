"use client";

import React, { useState } from "react";
import CreameDriping from "./effects/CreameDriping";
import Image from "next/image";
import { motion } from "framer-motion";

const HeroSection = () => {
  const [dripFinished, setDripFinished] = useState(false);
  const [current, setCurrent] = useState(0);

  const IceCreams = [
    {
      flavour: "Vanilla",
      title: "Made from Madagascar vanilla beans",
      description: "Smooth, creamy, and timeless.",
      price: 11.9,
      image: "/icecreams/vanilla-cream.png",
      cream: "#80734d",
      bg: "#E3D2AE",
    },
    {
      flavour: "Chocolate",
      title: "Made from premium Belgian cocoa",
      description: "Rich, velvety, and deeply satisfying.",
      price: 16.5,
      image: "/icecreams/chocolate-cream.png",
      cream: "#5D4037",
      bg: "#945643",
    },
    {
      flavour: "Blueberry",
      title: "Made from hand picked blueberries",
      description: "A refreshing burst of tangy sweetness.",
      price: 20.9,
      image: "/icecreams/blueberry-cream.png",
      cream: "#2C5282",
      bg: "#4F86F7",
    },
    {
      flavour: "Strawberry",
      title: "Made from fresh garden strawberries",
      description:
        "Sweet, summer-ripened strawberries blended into a creamy pink dream.",
      price: 19.2,
      image: "/icecreams/strawberry-cream.png",
      cream: "#C53030",
      bg: "#FF69B4",
    },
    {
      flavour: "Mango",
      title: "Made from juicy Alphonso mangoes",
      description: "A tropical escape in every scoop.",
      price: 12.5,
      image: "/icecreams/mango-cream.png",
      cream: "#DD6B20",
      bg: "#FFB347",
    },
  ];

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

      {/* MAIN GRID */}
      {/* We use grid to manage the side columns, but the center is dedicated to the image */}
      <div className="absolute z-10 h-full w-full grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr]">
        {/* Column-1 (Left Spacer) */}
        <div className="hidden lg:block border-2 border-indigo-500/0"></div>

        {/* Column-2 (THE STAGE) - Centered Flex */}
        {/* w-full on mobile, auto on desktop to hug content */}
        <div className="relative w-full h-full flex justify-center items-center">
          {/* ANCHOR CONTAINER: Everything positions relative to this box */}
          <div className="relative flex justify-between gap-5 space-x-2.5 items-center">
            {/* 1. TEXT: ICE */}
            {/* Z-0: Bottom Layer (Behind Image) */}
            {/* right-1/2: Starts at center, pushes left */}
            {/* translate-x-1/4: Nudges it slightly right to OVERLAP with image */}
            <motion.h1
              className="absolute left-[-3rem] md:left-[-5rem] lg:left-[-9rem] mb-[6rem] text-[7rem] md:text-[10rem] lg:text-[13rem] font-bold text-white whitespace-nowrap z-0 select-none"
              style={{ fontFamily: "lobster" }}
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: "25%", opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              ICE
            </motion.h1>

            {/* 2. IMAGE (THE CENTERPIECE) */}
            {/* Z-10: Middle Layer (On top of ICE, Below CREAM) */}
            {/* <div className="relative"> */}
            <motion.div
              className="relative z-10 w-[25rem] h-[35rem] md:w-[40rem] md:h-[50rem] lg:w-[45rem] lg:h-[52rem]"
              key={current}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Image
                src={IceCreams[current].image}
                alt="Ice cream image"
                fill
                className="object-contain drop-shadow-2xl"
                priority
              />
            </motion.div>

            {/* <motion.div 
              className="relative z-10 w-[25rem] h-[35rem] md:w-[28rem] md:h-[38rem]"
              key={current}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Image
                src={IceCreams[current].image}
                alt="Ice cream image"
                fill
                className="object-contain drop-shadow-2xl"
                priority
              />
            </motion.div>
            </div> */}

            {/* 3. TEXT: CREAM */}
            {/* Z-20: Top Layer (On top of Image) */}
            {/* left-1/2: Starts at center, pushes right */}
            {/* -translate-x-1/4: Nudges it slightly left to OVERLAP with image */}
            <motion.h1
              className="absolute right-[-7rem] md:right-[-10rem] lg:right-[-30rem] mt-[16rem] md:mt-[20rem] text-[6rem] md:text-[8rem] lg:text-[13rem] font-bold text-white whitespace-nowrap z-20"
              style={{ fontFamily: "lobster" }}
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: "-25%", opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              CREAM
            </motion.h1>
          </div>
        </div>

        {/* Column-3 (Right Spacer) */}
        <div className="hidden lg:block border-2 border-red-500/0"></div>
      </div>
    </div>
  );
};

export default HeroSection;
