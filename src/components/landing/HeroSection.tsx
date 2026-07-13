"use client";

import { useState } from "react";
import Image from "next/image";
import bgImage from "@/assets/images/bg-hero.webp";
import { motion, AnimatePresence } from "motion/react";
import NoiseOverlay from "@/components/landing/NoiseOverlay";
import AnimationTextHeading from "@/components/landing/AnimationTextHeading";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/layout/Navbar";

export default function HeroSection() {
  const [isIntroDone, setIsIntroDone] = useState(false);

  return (
    <main className="relative flex min-h-screen w-full items-center justify-center overflow-x-hidden">
      <NoiseOverlay />

      <div className="absolute inset-0 [mask-image:url('/gif/ink.gif')] mask-cover mask-no-repeat mask-alpha">
        <Image
          src={bgImage}
          width={736}
          height={924}
          alt="bg hero"
          placeholder="blur"
          className="absolute inset-0 h-full w-full object-cover object-bottom brightness-[0.6]"
        />
      </div>

      {/* Intro Animation */}
      <AnimationTextHeading
        autoExit
        exitDelay={5000}
        onComplete={() => setIsIntroDone(true)}
      />

      {/* Navbar — outside motion.div so fixed positioning works against viewport */}
      {isIntroDone && <Navbar />}

      {/* Main Content (Hero) */}
      <AnimatePresence>
        {isIntroDone && (
          <motion.div
            initial={{ opacity: 0, filter: "blur(10px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="absolute inset-0 z-40 flex flex-col"
          >
            {/* Hero Content */}
            <div className="flex-1 flex flex-col items-center justify-start px-4 text-center pt-32 md:pt-48 lg:pt-64">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="font-advercase relative z-10 text-4xl sm:text-5xl md:text-6xl lg:text-7xl uppercase leading-[1.2] tracking-normal text-balance text-[#FFF7E4] md:-mt-4 cursor-default [-webkit-text-stroke:1px_#42201C] md:[-webkit-text-stroke:2px_#42201C] [text-shadow:1px_1px_0_#42201C,2px_2px_0_#42201C,3px_3px_0_#42201C] sm:[text-shadow:1px_1px_0_#42201C,2px_2px_0_#42201C,3px_3px_0_#42201C,4px_4px_0_#42201C] md:[text-shadow:1px_1px_0_#42201C,2px_2px_0_#42201C,3px_3px_0_#42201C,4px_4px_0_#42201C]"
              >
                digital letters for <br className="hidden md:block"/>
                your loved ones
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="font-serif md:text-lg text-[#FFF7E4] max-w-lg mb-5 text-pretty"
              >
                Create beautiful, interactive open when letter collections to give to your loved ones.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.8 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Button size="lg" className="uppercase tracking-widest bg-[#310e10] text-[#FFF7E4] border-none hover:bg-[#42201C] hover:text-[#FFF7E4]">
                  Explore Now
                </Button>
                <Button size="lg" variant="outline" className="uppercase tracking-widest border-[#FFF7E4]! bg-black/5 backdrop-blur-2xl text-[#FFF7E4] hover:bg-black/20 hover:text-[#FFF7E4]">
                  Read Our Story
                </Button>

              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
