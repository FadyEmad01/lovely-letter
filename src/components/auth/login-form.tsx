"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth/client";
import { loginSchema, type LoginInput } from "@/lib/validation";

export default function LoginForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: LoginInput) {
    startTransition(async () => {
      const { error } = await authClient.signIn.email({
        email: data.email,
        password: data.password,
      });
      if (error) {
        const message =
          typeof error === "string"
            ? error
            : (error as { message?: string })?.message ||
            "Something went wrong. Please try again.";
        form.setError("root", { message });
        return;
      }
      router.push("/dashboard");
    });
  }

  const emailError = form.formState.errors.email?.message;
  const passwordError = form.formState.errors.password?.message;

  return (
    <div className="flex flex-col gap-6 relative z-[100]">
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup>
          <div className="flex flex-col items-start gap-2 text-start">
            <h1 className="text-3xl font-bold font-advercase">welcome back</h1>

          </div>

          <Field data-invalid={!!emailError}>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input
              id="email"
              {...form.register("email")}
              type="email"
              placeholder="m@example.com"
              aria-invalid={!!emailError}
              // className="bg-white/50"
              className="bg-white/50 "
            />
            <FieldError>{emailError}</FieldError>
          </Field>

          <Field data-invalid={!!passwordError}>
            <FieldLabel  htmlFor="password">Password</FieldLabel>
            <Input
              id="password"
              {...form.register("password")}
              type="password"
              aria-invalid={!!passwordError}
               className="bg-white/50"
            />
            <FieldError>{passwordError}</FieldError>
          </Field>

          {form.formState.errors.root && (
            <p className="text-sm text-destructive">
              {form.formState.errors.root.message}
            </p>
          )}

          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? "Signing in..." : "Sign in"}
          </Button>
        </FieldGroup>
      </form>
      <FieldDescription className="text-center">
        Don&apos;t have an account?{" "}
        <Link href="/register">Sign up</Link>
      </FieldDescription>
    </div>
  );
}