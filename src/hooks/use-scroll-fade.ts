"use client";

import { useState, useEffect, useRef, useCallback } from "react";

export function useScrollFade<T extends HTMLElement>(direction: "vertical" | "horizontal" = "vertical") {
  const ref = useRef<T>(null);
  const [showStartFade, setShowStartFade] = useState(false);
  const [showEndFade, setShowEndFade] = useState(false);

  const checkScroll = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    if (direction === "vertical") {
      setShowStartFade(el.scrollTop > 4);
      setShowEndFade(el.scrollTop + el.clientHeight < el.scrollHeight - 4);
    } else {
      setShowStartFade(el.scrollLeft > 4);
      setShowEndFade(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
    }
  }, [direction]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    checkScroll();
    el.addEventListener("scroll", checkScroll);
    window.addEventListener("resize", checkScroll);
    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, [checkScroll]);

  return { ref, showStartFade, showEndFade };
}
