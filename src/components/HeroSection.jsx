"use client";

import React, { useEffect, useState } from "react";
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
      cream: "#BC323A",
      bg: "#C53030",
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
      cream: "#AB4705",
      bg: "#DD6B20",
    },
  ];

  const handleNext = () => {
    setCurrent((prev) => (prev + 1) % IceCreams.length);
  };

  const handlePrev = () => {
    setCurrent((prev) => (prev - 1 + IceCreams.length) % IceCreams.length);
  };

  const PreloadNextImage = ({ src }) => (
    <Image
      src={src}
      alt=""
      width={1}
      height={1}
      loading="eager"
      className="hidden"
    />
  );

  const nextIndex = (current + 1) % IceCreams.length;

  return (
    <div className="relative overflow-hidden h-screen w-full bg-[#002455]">
      <PreloadNextImage src={IceCreams[nextIndex].image} />
      {/* Background Drip */}
      <div className="absolute z-0 w-full h-full min-h-screen">
        <CreameDriping
          color={IceCreams[current].bg}
          speed={1.5}
          onComplete={() => setDripFinished(true)}
        />
      </div>
      {/* Navbar */}
      <Navbar />
      {/* MAIN GRID */}
      <div className="h-screen absolute max-md:mt-5 z-10 h-full w-full grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr]">
        {/* Column 1 */}
        <div className="absolute top-0 left-0 w-full lg:static lg:w-auto h-auto lg:h-full flex flex-col justify-start lg:justify-between p-6 pt-10 md:pt-25 lg:pt-32 lg:pb-16 lg:pl-12 z-40 pointer-events-none">
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

          <motion.div
            className="mt-4 lg:mt-0 pointer-events-auto flex items-center gap-6"
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

        {/* Column 2 */}
        <div className="relative max-md:-mt-10 w-full h-full flex justify-center items-center">
          <div className="relative flex justify-between gap-5 space-x-2.5 items-center">
            <motion.h1
              className="absolute left-[-3rem] md:left-[-5rem] lg:left-[-9rem] mb-[6rem] text-[7rem] md:text-[10rem] lg:text-[13rem] font-bold whitespace-nowrap z-0 select-none bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent blur-[1px]"
              style={{ fontFamily: "lobster" }}
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: "25%", opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              ICE
            </motion.h1>

            {/* Images */}
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
                  className="object-contain drop-shadow-2xl grayscale-30"
                  priority={current === 0}
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
                  priority={current === 0}
                />
              </motion.div>
            </div>

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

        {/* Column 3 */}
        <div className="absolute bottom-0 right-0 w-full lg:static lg:w-auto h-auto lg:h-full flex flex-col justify-end max-md:mb-15 lg:pb-16 lg:pr-12 z-40 pointer-events-none">
          <div className="flex flex-col items-center lg:items-end text-center lg:text-right pointer-events-auto">
            {/* Description */}
            <motion.div
              key={`desc-${current}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="relative overflow-hidden bg-black/10 lg:bg-transparent lg:mb-60 p-4 lg:p-0 rounded-2xl backdrop-blur-sm lg:backdrop-blur-none"
            >
              {/* Shine Effect */}
              <motion.div
                className="absolute w-[100%] h-20 bg-gradient-to-r from-transparent via-white/40 to-transparent z-0"
                style={{ rotate: 45 }}
                initial={{ bottom: "-500%", left: "-500%" }}
                animate={{ bottom: "100%", left: "100%" }}
                transition={{
                  duration: 2.5,
                  delay: 0.8,
                  ease: "easeInOut",
                }}
              />

              <div className="relative z-10">
                <h3 className="text-white font-serif italic font-bold text-2xl lg:text-3xl mb-2 opacity-90 drop-shadow-md">
                  Flavor Profile
                </h3>
                <div className="mb-1 flex justify-center lg:justify-end">
                  <hr className=" w-[90%]  text-white" />
                </div>
                <p className="text-white/90 text-sm lg:text-lg leading-relaxed max-w-xs lg:max-w-sm ml-auto mr-auto lg:mr-0">
                  {IceCreams[current].description}
                </p>
              </div>
            </motion.div>

            {/* Buttons */}
            <div className="flex gap-4 mt-3 lg:mt-10">
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
