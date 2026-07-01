"use client";

import { useScrollFade } from "@/hooks/use-scroll-fade";

interface LetterContentProps {
  recipientName: string;
  content: string;
}

export function ClassicRomanceContent({ recipientName, content }: LetterContentProps) {
  const { ref, showStartFade, showEndFade } = useScrollFade<HTMLDivElement>("vertical");
  const arabic = /[\u0600-\u06FF]/.test(content);

  return (
    <div className="flex justify-center items-center w-full h-full p-4">
      <div className="w-full max-w-lg shadow-[0_10px_40px_rgba(0,0,0,0.1)] p-8 sm:p-12 flex flex-col relative">
        <div className="relative z-10">
          <h2 className="font-serif text-3xl sm:text-4xl">
            Dear:{" "}
            <span className="text-4xl sm:text-5xl text-red-950 font-semibold tracking-wide">
              {recipientName}
            </span>
          </h2>
        </div>

        <div className="mt-8 relative flex-grow h-[200px]">
          <div
            ref={ref}
            className="h-full overflow-y-scroll scrollbar-hide"
            dir={arabic ? "rtl" : "ltr"}
          >
            <p className={`text-lg sm:text-xl leading-relaxed whitespace-pre-line ${arabic ? "text-right" : "font-serif italic"}`}>
              {content}
            </p>
          </div>

          {showStartFade && (
            <div className="absolute top-0 left-0 right-0 h-10 bg-gradient-to-b from-[#EAE1D4] to-transparent pointer-events-none z-20" />
          )}
          {showEndFade && (
            <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-[#EAE1D4] to-transparent pointer-events-none z-20" />
          )}
        </div>

        <div className="mt-auto pt-8 relative z-10 text-right">
          <p className="font-serif text-2xl italic">Sincerely,</p>
          <p className="font-bold text-4xl sm:text-5xl text-red-950 mt-2 tracking-wider">Your Secret Admirer</p>
        </div>
      </div>
    </div>
  );
}
