"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  verifyLetterPassword,
  type VerifyPasswordState,
} from "@/actions/letters";

interface ModernLoveThemeProps {
  slug: string;
  recipientName: string;
  initialContent?: string;
}

export function ModernLoveTheme({
  slug,
  recipientName,
  initialContent,
}: ModernLoveThemeProps) {
  const [state, formAction, isPending] = useActionState<
    VerifyPasswordState | null,
    FormData
  >(verifyLetterPassword, null);

  if (initialContent || state?.content) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-zinc-50 to-white flex items-center justify-center p-4">
        <div className="w-full max-w-2xl">
          <div className="text-center mb-8">
            <p className="text-sm text-zinc-400 uppercase tracking-widest">A letter for</p>
            <h1 className="text-5xl font-light text-zinc-800 mt-2">
              {recipientName}
            </h1>
          </div>
          <div className="bg-white rounded-2xl shadow-xl p-10">
            <p className="text-lg leading-relaxed text-zinc-600 whitespace-pre-wrap font-light">
              {state?.content || initialContent || ""}
            </p>
            <div className="mt-10 pt-6 border-t border-zinc-100 text-right">
              <p className="text-sm text-zinc-400">With love,</p>
              <p className="text-xl text-zinc-700 font-medium mt-1">Yours</p>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-zinc-50 to-white p-4">
      <form action={formAction} className="w-full max-w-sm">
        <input type="hidden" name="slug" value={slug} />
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-light text-center mb-2">Private Letter</h2>
          <p className="text-sm text-zinc-400 text-center mb-6">
            Enter the password to read this letter
          </p>
          <Input
            name="password"
            type="password"
            placeholder="Password"
            className="text-center"
            required
          />
          {state?.error && (
            <p className="mt-2 text-sm text-red-500 text-center">{state.error}</p>
          )}
          <Button type="submit" className="w-full mt-4" disabled={isPending}>
            {isPending ? "Opening..." : "Open Letter"}
          </Button>
        </div>
      </form>
    </main>
  );
}
