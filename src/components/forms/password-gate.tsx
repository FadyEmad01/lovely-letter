"use client";

import { Heart, Lock } from "lucide-react";
import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  verifyLetterPassword,
  type VerifyPasswordState,
} from "@/actions/letters";

export function PasswordGate({ slug }: { slug: string }) {
  const [state, formAction, isPending] = useActionState<
    VerifyPasswordState | null,
    FormData
  >(verifyLetterPassword, null);

  if (state?.content) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-cream p-4">
        <Card className="w-full max-w-2xl">
          <CardHeader className="border-b text-center">
            <CardTitle className="font-serif text-3xl">
              To {state.recipientName}
            </CardTitle>
          </CardHeader>
          <CardContent className="py-8">
            <div className="prose prose-lg mx-auto whitespace-pre-wrap font-serif leading-relaxed text-foreground/90">
              {state.content}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <form
      action={formAction}
      className="flex min-h-screen items-center justify-center bg-cream p-4"
    >
      <input type="hidden" name="slug" value={slug} />
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-full bg-primary/10">
            <Lock className="size-6 text-primary" />
          </div>
          <CardTitle>Private Letter</CardTitle>
          <p className="text-sm text-muted-foreground">
            This letter is password protected. Enter the password to read it.
          </p>
        </CardHeader>
        <CardContent>
          <Field data-invalid={!!state?.error}>
            <FieldLabel htmlFor="password" className="sr-only">
              Password
            </FieldLabel>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Enter password"
              className="text-center"
              aria-invalid={!!state?.error}
              required
            />
            <FieldError>{state?.error}</FieldError>
          </Field>
          <Button type="submit" className="mt-4 w-full" disabled={isPending}>
            {isPending ? "Verifying..." : "View Letter"}
          </Button>
        </CardContent>
      </Card>
    </form>
  );
}
