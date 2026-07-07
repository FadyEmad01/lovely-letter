"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { PasswordField } from "@/components/auth/password-field";
import { toast } from "sonner";
import { authClient } from "@/lib/auth/client";
import { registerSchema, type RegisterInput } from "@/lib/validation";

export default function RegisterForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  async function onSubmit(data: RegisterInput) {
    setIsLoading(true);
    const toastId = toast.loading("Creating account...");

    try {
      const { error } = await authClient.signUp.email({
        name: data.name,
        email: data.email,
        password: data.password,
      });

      if (error) {
        toast.error(error?.message || "Something went wrong", { id: toastId });
        setIsLoading(false);
        return;
      }

      toast.success("Account created!", { id: toastId });
      router.push("/dashboard");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Something went wrong. Please try again.";
      toast.error(message, { id: toastId });
      setIsLoading(false);
    }
  }

  const nameError = form.formState.errors.name?.message;
  const emailError = form.formState.errors.email?.message;
  const passwordError = form.formState.errors.password?.message;

  return (
    <div className="flex flex-col gap-6 relative z-[100]">
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup>
          <div className="flex flex-col items-start gap-2 text-start">
            <h1 className="text-4xl font-normal font-advercase">join us</h1>
          </div>

          <Field data-invalid={!!nameError}>
            <FieldLabel htmlFor="name">Name</FieldLabel>
            <Input
              id="name"
              {...form.register("name")}
              placeholder="Your name"
              aria-invalid={!!nameError}
              className="bg-white/50"
            />
            <FieldError>{nameError}</FieldError>
          </Field>

          <Field data-invalid={!!emailError}>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input
              id="email"
              {...form.register("email")}
              type="email"
              placeholder="m@example.com"
              aria-invalid={!!emailError}
              className="bg-white/50"
            />
            <FieldError>{emailError}</FieldError>
          </Field>

          <Field data-invalid={!!passwordError}>
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <PasswordField
              id="password"
              value={form.watch("password")}
              onChange={(value) => form.setValue("password", value, { shouldValidate: true })}
              showStrength
              aria-invalid={!!passwordError}
            />
            <FieldError>{passwordError}</FieldError>
          </Field>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Creating account..." : "Create account"}
          </Button>

          {/* <FieldSeparator>Or</FieldSeparator>

          <div className="grid gap-4 sm:grid-cols-2">
            <Button variant="outline" type="button" className="w-full">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path
                  d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"
                  fill="currentColor"
                />
              </svg>
              Apple
            </Button>
            <Button variant="outline" type="button" className="w-full">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path
                  d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                  fill="currentColor"
                />
              </svg>
              Google
            </Button>
          </div> */}
        </FieldGroup>
      </form>
      <FieldDescription className="text-center">
        Already have an account?{" "}
        <Link href="/login">Sign in</Link>
      </FieldDescription>
    </div>
  );
}
