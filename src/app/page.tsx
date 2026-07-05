"use client";

import Image from "next/image";
import { Anton, Great_Vibes } from "next/font/google";
import bgImage from "@/assets/images/bg-hero.webp";
import { motion } from "framer-motion";
import StackedHeading from "@/components/landing/StackedHeading";
import LaceBorder from "@/components/landing/LaceBorder";
import NoiseOverlay from "@/components/landing/NoiseOverlay";

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
});

const greatVibes = Great_Vibes({
  weight: "400",
  subsets: ["latin"],
});

export default function Home() {
  const TextVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      y: 40,
    },
    show: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeInOut" as const},
    },
  };

  return (
    <main className="relative flex min-h-screen w-full items-center justify-center overflow-hidden">
      <NoiseOverlay />
      <div
        className="absolute inset-0 [mask-image:url('/gif/ink.gif')] [mask-size:cover] [mask-repeat:no-repeat] [mask-mode:alpha]"
      >
        <Image
          src={bgImage}
          width={736}
          height={924}
          alt="bg hero"
          placeholder="blur"
          className="absolute inset-0 h-full w-full object-cover object-bottom brightness-[0.6]"
        />
        {/* Overlay */}
        {/* <div className="absolute inset-0 bg-black/40" /> */}
      </div>

      {/* Main Typography Container */}
      <motion.div
        variants={TextVariants}
        initial="hidden"
        animate="show"
        className="relative flex flex-col items-center"
      >
        {/* Script Font: "The" */}
        <motion.div
          className={`${greatVibes.className} absolute -left-[15%] -top-[20%] z-20 -rotate-[8deg] text-7xl text-[#F9D5D3] drop-shadow-sm md:-top-[25%] md:text-9xl [-webkit-text-stroke:1px_#42201C] md:[-webkit-text-stroke:2px_#42201C]`}
        >
          The
        </motion.div>

        {/* Block Font: "TRUE" */}
        <motion.div
          className={`font-anton relative z-10 text-[5.5rem] uppercase leading-[0.85] tracking-wider text-[#FFF7E4] md:text-[10rem] cursor-default [-webkit-text-stroke:1px_#42201C] md:[-webkit-text-stroke:2px_#42201C] [text-shadow:1px_1px_0_#42201C,2px_2px_0_#42201C,3px_3px_0_#42201C,4px_4px_0_#42201C] md:[text-shadow:1px_1px_0_#42201C,2px_2px_0_#42201C,3px_3px_0_#42201C,4px_4px_0_#42201C,5px_5px_0_#42201C,6px_6px_0_#42201C,7px_7px_0_#42201C,8px_8px_0_#42201C]`}
        >
          TRUE
        </motion.div>

        {/* Block Font: "HEART" */}
        <motion.div
          className={`font-anton relative z-10 -mt-2 text-[6rem] uppercase leading-[0.85] tracking-normal text-[#FFF7E4] md:-mt-4 md:text-[11rem] cursor-default [-webkit-text-stroke:1px_#42201C] md:[-webkit-text-stroke:2px_#42201C] [text-shadow:1px_1px_0_#42201C,2px_2px_0_#42201C,3px_3px_0_#42201C,4px_4px_0_#42201C] md:[text-shadow:1px_1px_0_#42201C,2px_2px_0_#42201C,3px_3px_0_#42201C,4px_4px_0_#42201C,5px_5px_0_#42201C,6px_6px_0_#42201C,7px_7px_0_#42201C,8px_8px_0_#42201C]`}
        >
          HEART
        </motion.div>

        {/* Script Font: "Written" */}
        <motion.div
          className={`${greatVibes.className} absolute -bottom-[35%] left-1/2 z-30 -translate-x-[40%] -rotate-[8deg] text-7xl text-[#F9D5D3] drop-shadow-sm md:-bottom-[45%] md:text-[11rem] [-webkit-text-stroke:1px_#42201C] md:[-webkit-text-stroke:2px_#42201C]`}
        >
          Written
        </motion.div>
      </motion.div>
    </main>
  );
}
