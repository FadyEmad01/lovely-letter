"use client";

import { Heart, Lock } from "lucide-react";
import Link from "next/link";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createLetter } from "@/actions/letters";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldError,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { letterSchema, type LetterInput } from "@/lib/validation";

export default function NewLetterPage() {
  const [isPending, startTransition] = useTransition();

  const form = useForm<LetterInput>({
    resolver: zodResolver(letterSchema),
    defaultValues: {
      recipientName: "",
      content: "",
      password: "",
    },
  });

  const fieldError = (field: keyof LetterInput) =>
    form.formState.errors[field]?.message;

  async function onSubmit(data: LetterInput) {
    startTransition(async () => {
      const formData = new FormData();
      formData.set("recipientName", data.recipientName);
      formData.set("content", data.content);
      if (data.password) formData.set("password", data.password);

      const result = await createLetter({ error: null }, formData);
      if (result?.error) {
        if (typeof result.error === "object") {
          for (const [field, messages] of Object.entries(result.error)) {
            form.setError(field as keyof LetterInput, {
              message: (messages as string[])?.[0],
            });
          }
        } else {
          form.setError("root", { message: result.error });
        }
      }
    });
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Write a Love Letter</h1>
        <p className="text-muted-foreground mt-1">
          Express your feelings with a beautiful, private letter
        </p>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card>
          <CardHeader>
            <CardTitle>Letter Details</CardTitle>
            <CardDescription>
              Fill in the details below. Your message will be encrypted
              end-to-end.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FieldGroup>
              <Field data-invalid={!!fieldError("recipientName")}>
                <FieldLabel htmlFor="recipientName">
                  To (recipient name)
                </FieldLabel>
                <Input
                  id="recipientName"
                  {...form.register("recipientName")}
                  placeholder="Dear..."
                  aria-invalid={!!fieldError("recipientName")}
                />
                <FieldError>{fieldError("recipientName")}</FieldError>
              </Field>

              <Field data-invalid={!!fieldError("content")}>
                <FieldLabel htmlFor="content">Your message</FieldLabel>
                <textarea
                  id="content"
                  {...form.register("content")}
                  rows={12}
                  className="flex w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 min-h-[200px] resize-y aria-invalid:border-destructive"
                  placeholder="Write from the heart..."
                  aria-invalid={!!fieldError("content")}
                />
                <FieldError>{fieldError("content")}</FieldError>
              </Field>

              <Field data-invalid={!!fieldError("password")}>
                <FieldLabel htmlFor="password" className="flex items-center gap-2">
                  <Lock className="size-4" />
                  Password protection (optional)
                </FieldLabel>
                <Input
                  id="password"
                  {...form.register("password")}
                  type="password"
                  placeholder="Leave empty for public, or set a password"
                  aria-invalid={!!fieldError("password")}
                />
                <p className="text-xs text-muted-foreground">
                  If set, the reader will need this password to view the letter.
                  The message will be encrypted with this password.
                </p>
                <FieldError>{fieldError("password")}</FieldError>
              </Field>

              {form.formState.errors.root && (
                <p className="text-sm text-destructive">
                  {form.formState.errors.root.message}
                </p>
              )}

              <div className="flex gap-4 pt-4">
                <Button type="submit" className="gap-2" disabled={isPending}>
                  <Heart className="size-4" />
                  {isPending ? "Creating..." : "Create Letter"}
                </Button>
                <Link href="/letters">
                  <Button type="button" variant="outline">
                    Cancel
                  </Button>
                </Link>
              </div>
            </FieldGroup>
          </CardContent>
        </Card>
      </form>
    </div>
  );
}
