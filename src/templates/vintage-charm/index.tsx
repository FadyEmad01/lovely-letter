"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  verifyLetterPassword,
  type VerifyPasswordState,
} from "@/actions/letters";

interface VintageCharmThemeProps {
  slug: string;
  recipientName: string;
  initialContent?: string;
}

export function VintageCharmTheme({
  slug,
  recipientName,
  initialContent,
}: VintageCharmThemeProps) {
  const [state, formAction, isPending] = useActionState<
    VerifyPasswordState | null,
    FormData
  >(verifyLetterPassword, null);

  if (initialContent || state?.content) {
    return (
      <main className="min-h-screen bg-[#F5F0E8] flex items-center justify-center p-4">
        <div className="w-full max-w-2xl" style={{ filter: "sepia(0.3)" }}>
          <div className="border-8 border-double border-amber-900/20 bg-[#FDF8F0] p-10 shadow-2xl">
            <div className="text-center mb-8 pb-6 border-b border-amber-900/10">
              <h1 className="text-4xl font-serif text-amber-950">
                My Dearest {recipientName}
              </h1>
            </div>
            <div className="text-lg leading-[2] text-amber-900/80 whitespace-pre-wrap font-serif">
              {state?.content || initialContent || ""}
            </div>
            <div className="mt-10 pt-6 border-t border-amber-900/10 text-right">
              <p className="text-sm text-amber-700/60 italic">Ever yours,</p>
              <p className="text-2xl font-serif text-amber-950 mt-1">...&hearts;</p>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#F5F0E8] p-4">
      <form action={formAction} className="w-full max-w-sm">
        <input type="hidden" name="slug" value={slug} />
        <div className="border-8 border-double border-amber-900/20 bg-[#FDF8F0] p-8 shadow-2xl rounded">
          <h2 className="text-2xl font-serif text-amber-950 text-center mb-2">
            A Sealed Letter
          </h2>
          <p className="text-sm text-amber-700/60 text-center italic mb-6">
            This letter is sealed with a password
          </p>
          <Input
            name="password"
            type="password"
            placeholder="Enter passphrase"
            className="text-center font-serif bg-amber-50/50 border-amber-900/20"
            required
          />
          {state?.error && (
            <p className="mt-2 text-sm text-red-700 text-center font-serif italic">
              {state.error}
            </p>
          )}
          <Button
            type="submit"
            disabled={isPending}
            className="w-full mt-4 bg-amber-950 hover:bg-amber-900 text-amber-50 font-serif"
          >
            {isPending ? "Unsealing..." : "Unseal Letter"}
          </Button>
        </div>
      </form>
    </main>
  );
}
