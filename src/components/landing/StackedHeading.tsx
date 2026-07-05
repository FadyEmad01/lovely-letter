// "use client";

// import { motion } from "motion/react";
// import React, { CSSProperties } from "react";

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

// export interface StackedLine {
//   text: string;
//   className?: string; // Allows overriding font-size, tracking, and margins per line
// }

// interface StackedHeadingProps {
//   topScript?: string;
//   topScriptClassName?: string;
//   lines: StackedLine[];
//   bottomScript?: string;
//   bottomScriptClassName?: string;
//   fillColor?: string;
//   scriptColor?: string;
//   strokeColor?: string;
//   className?: string;
// }

// export default function StackedHeading({
//   topScript,
//   topScriptClassName = "-left-[15%] -top-[20%] text-7xl md:-top-[25%] md:text-9xl",
//   lines,
//   bottomScript,
//   bottomScriptClassName = "-bottom-[35%] left-1/2 z-30 -translate-x-[40%] text-7xl md:-bottom-[45%] md:text-[11rem]",
//   fillColor = "#FFF7E4",
//   scriptColor = "#F9D5D3",
//   strokeColor = "#42201C",
//   className = "",
// }: StackedHeadingProps) {

//   // Map props to CSS variables to allow strict px-based Tailwind rendering
//   const customStyles = {
//     "--fill": fillColor,
//     "--script": scriptColor,
//     "--stroke": strokeColor,
//     "--shadow-mobile": "1px 1px 0 var(--stroke), 2px 2px 0 var(--stroke), 3px 3px 0 var(--stroke), 4px 4px 0 var(--stroke)",
//     "--shadow-desktop": "1px 1px 0 var(--stroke), 2px 2px 0 var(--stroke), 3px 3px 0 var(--stroke), 4px 4px 0 var(--stroke), 5px 5px 0 var(--stroke), 6px 6px 0 var(--stroke), 7px 7px 0 var(--stroke), 8px 8px 0 var(--stroke)",
//   } as CSSProperties;

//   return (
//     <motion.div
//       variants={containerVariants}
//       initial="hidden"
//       animate="show"
//       style={customStyles}
//       className={`relative flex flex-col items-center ${className}`}
//     >
//       {/* Top Script */}
//       {topScript && (
//         <motion.div
//           variants={scriptTextVariants}
//           className={`font-great-vibes absolute -rotate-[8deg] drop-shadow-sm text-[color:var(--script)] [-webkit-text-stroke:1px_var(--stroke)] md:[-webkit-text-stroke:2px_var(--stroke)] ${topScriptClassName} z-40`}
//         >
//           {topScript}
//         </motion.div>
//       )}

//       {/* Block Lines */}
//       {lines.map((line, i) => (
//         <motion.div
//           key={line.text + i}
//           variants={blockTextVariants}
//           whileHover={{ scale: 1.02 }}
//           transition={{ type: "spring", stiffness: 400 }}
//           className={`font-anton relative z-10 uppercase leading-[0.85] cursor-default text-[color:var(--fill)] [-webkit-text-stroke:1px_var(--stroke)] md:[-webkit-text-stroke:2px_var(--stroke)] [text-shadow:var(--shadow-mobile)] md:[text-shadow:var(--shadow-desktop)] ${line.className || ""}`}
//         >
//           {line.text}
//         </motion.div>
//       ))}

//       {/* Bottom Script */}
//       {bottomScript && (
//         <motion.div
//           variants={scriptTextVariants}
//           className={`font-great-vibes absolute -rotate-[8deg] drop-shadow-sm text-[color:var(--script)] [-webkit-text-stroke:1px_var(--stroke)] md:[-webkit-text-stroke:2px_var(--stroke)] ${bottomScriptClassName}`}
//         >
//           {bottomScript}
//         </motion.div>
//       )}
//     </motion.div>
//   );
// }

"use client";

import { motion } from "motion/react";
import React, { CSSProperties } from "react";

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
  className?: string; // Overrides per line (use 'text-[1.5em]' instead of 'text-xl' to keep scaling intact)
}

interface StackedHeadingProps {
  size?: number; // Base scale in pixels (e.g., 64, 128, 256)
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
  size = 64, // Default base size is 64px
  topScript,
  // Using 'em' instead of 'text-7xl' to automatically scale with the 'size' prop
  topScriptClassName = "-left-[15%] -top-[20%] text-[1.2em] md:-top-[25%] md:text-[1.8em]",
  lines,
  bottomScript,
  bottomScriptClassName = "-bottom-[35%] left-1/2 z-30 -translate-x-[40%] text-[1.2em] md:-bottom-[45%] md:text-[2.2em]",
  fillColor = "#FFF7E4",
  scriptColor = "#F9D5D3",
  strokeColor = "#42201C",
  className = "",
}: StackedHeadingProps) {

  // Map props to CSS variables. We replace hardcoded 'px' with 'em' 
  // so strokes and shadows grow/shrink perfectly with the 'size' prop.
  const customStyles = {
    fontSize: `${size}px`, // This is the engine of the scaling
    "--fill": fillColor,
    "--script": scriptColor,
    "--stroke": strokeColor,
    "--shadow-mobile": "0.02em 0.02em 0 var(--stroke), 0.04em 0.04em 0 var(--stroke), 0.06em 0.06em 0 var(--stroke), 0.08em 0.08em 0 var(--stroke)",
    "--shadow-desktop": "0.02em 0.02em 0 var(--stroke), 0.04em 0.04em 0 var(--stroke), 0.06em 0.06em 0 var(--stroke), 0.08em 0.08em 0 var(--stroke), 0.1em 0.1em 0 var(--stroke), 0.12em 0.12em 0 var(--stroke), 0.14em 0.14em 0 var(--stroke), 0.16em 0.16em 0 var(--stroke)",
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
          // Changed text-stroke to em
          className={`font-great-vibes absolute -rotate-[8deg] drop-shadow-sm text-[color:var(--script)] [-webkit-text-stroke:0.015em_var(--stroke)] md:[-webkit-text-stroke:0.02em_var(--stroke)] ${topScriptClassName} z-40`}
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
          // Changed text-stroke to em
          className={`font-anton relative z-10 uppercase leading-[0.85] cursor-default text-[color:var(--fill)] [-webkit-text-stroke:0.015em_var(--stroke)] md:[-webkit-text-stroke:0.02em_var(--stroke)] [text-shadow:var(--shadow-mobile)] md:[text-shadow:var(--shadow-desktop)] ${line.className || ""}`}
        >
          {line.text}
        </motion.div>
      ))}

      {/* Bottom Script */}
      {bottomScript && (
        <motion.div
          variants={scriptTextVariants}
          // Changed text-stroke to em
          className={`font-great-vibes absolute -rotate-[8deg] drop-shadow-sm text-[color:var(--script)] [-webkit-text-stroke:0.015em_var(--stroke)] md:[-webkit-text-stroke:0.02em_var(--stroke)] ${bottomScriptClassName}`}
        >
          {bottomScript}
        </motion.div>
      )}
    </motion.div>
  );
}