"use client";

import React from "react";

interface LaceBorderProps {
  /** 
   * The Tailwind background color for the solid top section. 
   * Note: Your SVG file must also be colored to match this in your design software!
   */
  fillColor?: string;
  /** Height of the solid upper section */
  solidHeightClass?: string;
  /** Height of the repeating lace pattern */
  laceHeightClass?: string;
  /** Positioning for the entire block */
  className?: string;
}

export default function LaceBorder({
  fillColor = "bg-[#F3EFE6]", 
//   solidHeightClass = "h-12 md:h-24",
  laceHeightClass = "h-16 md:h-24",
  className = "absolute top-0 left-0 w-full z-20 flex flex-col",
}: LaceBorderProps) {
  return (
    <div className={className}>
      {/* 1. The Solid Upper Section */}
      <div className={`${fillColor} w-full`} />
      
      {/* 2. The Normal SVG Background */}
      <div
        className={`${laceHeightClass} w-full -mt-[1px]`} // -mt-[1px] removes any sub-pixel rendering gaps
        style={{
          // Point this to your actual SVG file in the public folder
          backgroundImage: `url('/svg/lace-1.svg')`,
          backgroundRepeat: "repeat-x",
          backgroundSize: "auto 100%",
          backgroundPosition: "top left",
        }}
      />
    </div>
  );
}