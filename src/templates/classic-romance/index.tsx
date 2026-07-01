"use client";

import { Lock } from "lucide-react";
import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import {
  verifyLetterPassword,
  type VerifyPasswordState,
} from "@/actions/letters";
import { ClassicRomanceContent } from "./letter-content";

interface ClassicRomanceThemeProps {
  slug: string;
  recipientName: string;
  initialContent?: string;
}

export function ClassicRomanceTheme({
  slug,
  recipientName,
  initialContent,
}: ClassicRomanceThemeProps) {
  const [state, formAction, isPending] = useActionState<
    VerifyPasswordState | null,
    FormData
  >(verifyLetterPassword, null);

  if (initialContent || state?.content) {
    return (
      <main className="min-h-screen sm:flex bg-[#EAE1D4]">
        <div className="w-full sm:w-1/2 relative sm:min-h-screen bg-gradient-to-br from-rose-900/20 to-amber-900/30 flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-rose-800/20 via-transparent to-amber-900/20" />
          <div className="relative flex items-center justify-center w-[60%] aspect-[506/218]">
            <div className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-lg" />
            <h1
              className={`relative text-4xl sm:text-6xl font-bold text-red-950 tracking-wide ${
                /[\u0600-\u06FF]/.test(recipientName) ? "leading-relaxed" : "font-serif"
              }`}
            >
              {recipientName}
            </h1>
          </div>
        </div>
        <div className="w-full sm:w-1/2 sm:min-h-screen">
          <ClassicRomanceContent
            recipientName={recipientName}
            content={state?.content || initialContent || ""}
          />
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#EAE1D4] p-4">
      <form action={formAction} className="w-full max-w-sm">
        <input type="hidden" name="slug" value={slug} />
        <div className="bg-[#EAE1D4] shadow-[0_10px_40px_rgba(0,0,0,0.1)] p-8 rounded">
          <div className="mb-6 flex flex-col items-center gap-4">
            <div className="flex size-14 items-center justify-center rounded-full bg-red-950/10">
              <Lock className="size-6 text-red-950" />
            </div>
            <h2 className="font-serif text-3xl text-center">
              Enter Password for{" "}
              <span className="text-4xl text-red-950 font-bold block mt-1">
                {recipientName}
              </span>
            </h2>
          </div>
          <input
            name="password"
            type="password"
            placeholder="Password..."
            required
            className="w-full px-4 py-3 rounded border border-red-900 bg-white/60 focus:outline-none focus:ring-2 focus:ring-red-950 font-serif italic text-lg"
          />
          {state?.error && (
            <p className="mt-3 text-red-700 text-sm font-serif italic">
              {state.error}
            </p>
          )}
          <Button
            type="submit"
            disabled={isPending}
            className="mt-4 w-full py-6 bg-red-950 text-white font-serif text-xl rounded hover:bg-red-900 transition-colors"
          >
            {isPending ? "Opening..." : "Open Letter"}
          </Button>
        </div>
      </form>
    </main>
  );
}
