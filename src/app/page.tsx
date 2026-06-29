import { Heart, Lock, Shield, Sparkles } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth/server";

export const dynamic = "force-dynamic";

export default async function Home() {
  const { data: session } = await auth.getSession();

  return (
    <div className="flex min-h-screen flex-col bg-cream">
      <header className="flex items-center justify-between border-b bg-card/80 backdrop-blur-sm px-6 py-4 sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <Heart className="size-6 text-primary" />
          <span className="text-xl font-bold">Love Letter</span>
        </div>
        <div className="flex items-center gap-3">
          {session?.user ? (
            <Link href="/dashboard">
              <Button>Dashboard</Button>
            </Link>
          ) : (
            <>
              <Link href="/login">
                <Button variant="ghost">Sign in</Button>
              </Link>
              <Link href="/register">
                <Button>Get Started</Button>
              </Link>
            </>
          )}
        </div>
      </header>

      <section className="flex flex-1 flex-col items-center justify-center px-6 py-24 text-center">
        <div className="mx-auto max-w-3xl space-y-8">
          <div className="inline-flex items-center gap-2 rounded-full border bg-card px-4 py-1.5 text-sm text-muted-foreground">
            <Sparkles className="size-4 text-primary" />
            Encrypted love letters for the ones who matter
          </div>

          <h1 className="text-5xl font-bold tracking-tight sm:text-6xl">
            Write from the <span className="text-primary">heart</span>, share
            with confidence
          </h1>

          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Create beautiful, encrypted love letters with custom templates.
            Share a private link — optionally password-protected — so your words
            reach only the right person.
          </p>

          <div className="flex items-center justify-center gap-4">
            {session?.user ? (
              <Link href="/letters/new">
                <Button size="lg" className="gap-2 text-base">
                  <Heart className="size-5" />
                  Write a Letter
                </Button>
              </Link>
            ) : (
              <Link href="/register">
                <Button size="lg" className="gap-2 text-base">
                  <Heart className="size-5" />
                  Start Writing Free
                </Button>
              </Link>
            )}
          </div>
        </div>
      </section>

      <section className="border-t bg-card/50 px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-12 text-center text-3xl font-bold">How it works</h2>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="space-y-3 text-center">
              <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-primary/10">
                <Heart className="size-6 text-primary" />
              </div>
              <h3 className="font-semibold">1. Write your letter</h3>
              <p className="text-sm text-muted-foreground">
                Choose a template and express your feelings. Add a password for
                extra privacy.
              </p>
            </div>
            <div className="space-y-3 text-center">
              <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-primary/10">
                <Lock className="size-6 text-primary" />
              </div>
              <h3 className="font-semibold">2. Encrypted & secure</h3>
              <p className="text-sm text-muted-foreground">
                Your message is encrypted with AES-256-GCM. Even we cannot read
                your private letters.
              </p>
            </div>
            <div className="space-y-3 text-center">
              <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-primary/10">
                <Shield className="size-6 text-primary" />
              </div>
              <h3 className="font-semibold">3. Share the link</h3>
              <p className="text-sm text-muted-foreground">
                Get a unique, unguessable link. Share it via text, email, or
                social — only the special one can open it.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-12 text-center text-3xl font-bold">Features</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-xl border bg-card p-6">
              <h3 className="mb-2 font-semibold">End-to-End Encryption</h3>
              <p className="text-sm text-muted-foreground">
                Messages are encrypted with AES-256-GCM using your password. No
                one — not even us — can read them without it.
              </p>
            </div>
            <div className="rounded-xl border bg-card p-6">
              <h3 className="mb-2 font-semibold">Beautiful Templates</h3>
              <p className="text-sm text-muted-foreground">
                Choose from curated designs with custom fonts, colors, and
                backgrounds to make your letter special.
              </p>
            </div>
            <div className="rounded-xl border bg-card p-6">
              <h3 className="mb-2 font-semibold">Private Links</h3>
              <p className="text-sm text-muted-foreground">
                Every letter gets a unique nanoid slug that cannot be guessed.
                Optional password adds another layer of security.
              </p>
            </div>
            <div className="rounded-xl border bg-card p-6">
              <h3 className="mb-2 font-semibold">
                No Account Required to Read
              </h3>
              <p className="text-sm text-muted-foreground">
                Recipients can open your letter without signing up. Just share
                the link and they see it instantly.
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t px-6 py-8 text-center text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} Love Letter. Made with care.</p>
      </footer>
    </div>
  );
}
