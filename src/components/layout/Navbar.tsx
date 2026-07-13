"use client";

import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import { useScroll } from "@/hooks/use-scroll";
import Link from "next/link";


export default function Navbar() {
  // Activate scrolled state when page rolls down 50px.
  // Deactivates automatically at 25px (50 / 2) due to your hook's fallback logic.
  const isScrolled = useScroll(50); 
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinksLeft = [
    { label: "OUR STORY", href: "#story" },
    { label: "DETAILS", href: "#details" },
  ];

  const navLinksRight = [
    { label: "RSVP", href: "#rsvp" },
    { label: "SCHEDULE", href: "#schedule" },
  ];

  return (
    <>
      <nav
        className={cn(
          // --- POSITIONING (Choose 'fixed' or 'sticky' here) ---
          "fixed top-0 left-0 right-0 z-50 w-full", 
          
          // --- STYLING TRANSITIONS ---
          "transition-all duration-500 ease-in-out px-6 md:px-12 py-4",
          isScrolled
            ? "bg-[#FFF7E4] text-stone-850 shadow-sm"
            : "bg-transparent text-white"
        )}
      >
        {/* DESKTOP LAYOUT */}
        <div className="max-w-7xl mx-auto hidden md:grid grid-cols-3 items-center">
          <div className="flex justify-end gap-12 font-serif text-sm tracking-widest">
            {navLinksLeft.map((link) => (
              <a key={link.label} href={link.href} className="hover:opacity-60 transition-opacity text-[#FFF7E4]">
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex justify-center">
            <Link
              href="/"
              className={cn(
                "font-serif text-4xl italic transition-colors duration-500",
                // isScrolled ? "text-amber-900" : "text-white"
              )}
            >
              <img src="/svg/logo.svg" alt="logo" className="size-24" />
            </Link>
          </div>

          <div className="flex justify-start gap-12 font-serif text-sm tracking-widest">
            {navLinksRight.map((link) => (
              <a key={link.label} href={link.href} className="hover:opacity-60 transition-opacity text-[#FFF7E4]">
                {link.label}
              </a>
            ))}
          </div>
        </div>

        {/* MOBILE LAYOUT */}
        <div className="md:hidden flex justify-between items-center">
          <Link
              href="/"
              className={cn(
                "font-serif text-4xl italic transition-colors duration-500",
                // isScrolled ? "text-amber-900" : "text-white"
              )}
            >
              <img src="/svg/logo.svg" alt="logo" className="size-16" />
            </Link>
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2">
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {/* MOBILE DROPDOWN OVERLAY */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-[#FFF7E4] text-stone-850 pt-24 px-6 flex flex-col gap-6 text-center font-serif text-xl tracking-widest md:hidden"
          >
            {[...navLinksLeft, ...navLinksRight].map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="py-3 border-b border-stone-200 uppercase last:border-none"
              >
                {link.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}