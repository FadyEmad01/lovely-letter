import type { Metadata } from "next";
import { Anton, Great_Vibes, Imperial_Script, Pinyon_Script } from "next/font/google";
import { TooltipProvider } from "@/components/ui/tooltip";
import "./globals.css";

const is = Imperial_Script({
  variable: "--font-is",
  weight: ['400']
});
const ps = Pinyon_Script({
  variable: "--font-ps",
  weight: ['400']
});
const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
});

const greatVibes = Great_Vibes({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-great-vibes",
});


export const metadata: Metadata = {
  title: "Love Letter - Write from the heart",
  description:
    "Create beautiful, encrypted love letters with custom templates. Share a private, unguessable link with the ones who matter.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
    >
      <body className={`${is.variable} ${ps.variable} ${anton.variable} ${greatVibes.variable} min-h-screen antialiased`}>
        <TooltipProvider>{children}</TooltipProvider>
      </body>
    </html >
  );
}
