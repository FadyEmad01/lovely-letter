// "use client";

// import { motion } from "motion/react";
// import { Anton, Great_Vibes } from "next/font/google";
// import { CSSProperties } from "react";

// const anton = Anton({ weight: "400", subsets: ["latin"] });
// const greatVibes = Great_Vibes({ weight: "400", subsets: ["latin"] });

// const containerVariants = {
//   hidden: { opacity: 0 },
//   show: { opacity: 1, transition: { staggerChildren: 0.25, delayChildren: 0.4 } },
// };

// const blockTextVariants = {
//   hidden: { opacity: 0, y: 40 },
//   show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 40, damping: 15 } },
// };

// const scriptTextVariants = {
//   hidden: { opacity: 0, scale: 0.8 },
//   show: { opacity: 1, scale: 1, transition: { type: "spring" as const, stiffness: 30, damping: 15 } },
// };

// // Builds the stacked outline shadow, in em units so it scales with font-size
// function stackShadow(color: string, steps: number, stepEm: number) {
//   return Array.from({ length: steps }, (_, i) => {
//     const d = (i + 1) * stepEm;
//     return `${d}em ${d}em 0 ${color}`;
//   }).join(", ");
// }

// interface StackedHeadingProps {
//   topScript?: string;
//   lines: string[];          // e.g. ["TRUE", "HEART"] — as many block words as you want
//   bottomScript?: string;
//   fillColor?: string;       // block text fill
//   scriptColor?: string;     // script text fill
//   strokeColor?: string;     // outline + shadow color
//   size?: number;            // 1 = default. 1.3 = everything 30% bigger, same proportions
//   className?: string;
// }

// export default function StackedHeading({
//   topScript,
//   lines,
//   bottomScript,
//   fillColor = "#FFF7E4",
//   scriptColor = "#F9D5D3",
//   strokeColor = "#42201C",
//   size = 1,
//   className = "",
// }: StackedHeadingProps) {
//   // Fluid, responsive font sizes driven by a single `size` multiplier.
//   // clamp(min, preferred-vw, max) removes the need for separate md: breakpoints.
//   const blockFontSize = `clamp(${3.5 * size}rem, ${4 * size}vw + ${2 * size}rem, ${10 * size}rem)`;
//   const scriptFontSize = `clamp(${3 * size}rem, ${3.5 * size}vw + ${1.5 * size}rem, ${9 * size}rem)`;

//   // em-based stroke/shadow → automatically scale with font-size, no manual px tuning
//   const blockStyle: CSSProperties = {
//     fontSize: blockFontSize,
//     color: fillColor,
//     WebkitTextStroke: `0.015em ${strokeColor}`,
//     textShadow: stackShadow(strokeColor, 8, 0.008),
//   };

//   const scriptStyle: CSSProperties = {
//     fontSize: scriptFontSize,
//     color: scriptColor,
//     WebkitTextStroke: `0.015em ${strokeColor}`,
//   };

//   return (
//     <motion.div
//       variants={containerVariants}
//       initial="hidden"
//       animate="show"
//       className={`relative flex flex-col items-center ${className}`}
//     >
//       {topScript && (
//         <motion.div
//           variants={scriptTextVariants}
//           style={scriptStyle}
//           className={`${greatVibes.className} absolute -left-[15%] -top-[20%] z-20 -rotate-[8deg] drop-shadow-sm md:-top-[25%]`}
//         >
//           {topScript}
//         </motion.div>
//       )}

//       {lines.map((line, i) => (
//         <motion.div
//           key={line + i}
//           variants={blockTextVariants}
//           whileHover={{ scale: 1.02 }}
//           transition={{ type: "spring", stiffness: 400 }}
//           style={blockStyle}
//           className={`${anton.className} relative z-10 uppercase leading-[0.85] tracking-wider cursor-default ${
//             i > 0 ? "-mt-2 md:-mt-4" : ""
//           }`}
//         >
//           {line}
//         </motion.div>
//       ))}

//       {bottomScript && (
//         <motion.div
//           variants={scriptTextVariants}
//           style={scriptStyle}
//           className={`${greatVibes.className} absolute -bottom-[35%] left-1/2 z-30 -translate-x-[40%] -rotate-[8deg] drop-shadow-sm md:-bottom-[45%]`}
//         >
//           {bottomScript}
//         </motion.div>
//       )}
//     </motion.div>
//   );
// }

"use client";

import { motion } from "motion/react";
import { Anton, Great_Vibes } from "next/font/google";
import React, { CSSProperties } from "react";

const anton = Anton({ weight: "400", subsets: ["latin"] });
const greatVibes = Great_Vibes({ weight: "400", subsets: ["latin"] });

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.25, delayChildren: 0.4 } },
};

const blockTextVariants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 40, damping: 15 } },
};

const scriptTextVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  show: { opacity: 1, scale: 1, transition: { type: "spring" as const, stiffness: 30, damping: 15 } },
};

export interface StackedLine {
  text: string;
  className?: string; // Allows overriding font-size, tracking, and margins per line
}

interface StackedHeadingProps {
  topScript?: string;
  topScriptClassName?: string;
  lines: StackedLine[];
  bottomScript?: string;
  bottomScriptClassName?: string;
  fillColor?: string;
  scriptColor?: string;
  strokeColor?: string;
  className?: string;
}

export default function StackedHeading({
  topScript,
  topScriptClassName = "-left-[15%] -top-[20%] text-7xl md:-top-[25%] md:text-9xl",
  lines,
  bottomScript,
  bottomScriptClassName = "-bottom-[35%] left-1/2 z-30 -translate-x-[40%] text-7xl md:-bottom-[45%] md:text-[11rem]",
  fillColor = "#FFF7E4",
  scriptColor = "#F9D5D3",
  strokeColor = "#42201C",
  className = "",
}: StackedHeadingProps) {
  
  // Map props to CSS variables to allow strict px-based Tailwind rendering
  const customStyles = {
    "--fill": fillColor,
    "--script": scriptColor,
    "--stroke": strokeColor,
    "--shadow-mobile": "1px 1px 0 var(--stroke), 2px 2px 0 var(--stroke), 3px 3px 0 var(--stroke), 4px 4px 0 var(--stroke)",
    "--shadow-desktop": "1px 1px 0 var(--stroke), 2px 2px 0 var(--stroke), 3px 3px 0 var(--stroke), 4px 4px 0 var(--stroke), 5px 5px 0 var(--stroke), 6px 6px 0 var(--stroke), 7px 7px 0 var(--stroke), 8px 8px 0 var(--stroke)",
  } as CSSProperties;

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      style={customStyles}
      className={`relative flex flex-col items-center ${className}`}
    >
      {/* Top Script */}
      {topScript && (
        <motion.div
          variants={scriptTextVariants}
          className={`${greatVibes.className} absolute -rotate-[8deg] drop-shadow-sm text-[color:var(--script)] [-webkit-text-stroke:1px_var(--stroke)] md:[-webkit-text-stroke:2px_var(--stroke)] ${topScriptClassName} z-40`}
        >
          {topScript}
        </motion.div>
      )}

      {/* Block Lines */}
      {lines.map((line, i) => (
        <motion.div
          key={line.text + i}
          variants={blockTextVariants}
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 400 }}
          className={`${anton.className} relative z-10 uppercase leading-[0.85] cursor-default text-[color:var(--fill)] [-webkit-text-stroke:1px_var(--stroke)] md:[-webkit-text-stroke:2px_var(--stroke)] [text-shadow:var(--shadow-mobile)] md:[text-shadow:var(--shadow-desktop)] ${line.className || ""}`}
        >
          {line.text}
        </motion.div>
      ))}

      {/* Bottom Script */}
      {bottomScript && (
        <motion.div
          variants={scriptTextVariants}
          className={`${greatVibes.className} absolute -rotate-[8deg] drop-shadow-sm text-[color:var(--script)] [-webkit-text-stroke:1px_var(--stroke)] md:[-webkit-text-stroke:2px_var(--stroke)] ${bottomScriptClassName}`}
        >
          {bottomScript}
        </motion.div>
      )}
    </motion.div>
  );
}