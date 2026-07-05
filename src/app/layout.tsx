import type { Metadata } from "next";
import localFont from "next/font/local";
import { Anton, Great_Vibes, Imperial_Script, Pinyon_Script, Inter, EB_Garamond } from "next/font/google";
import { TooltipProvider } from "@/components/ui/tooltip";
import "./globals.css";

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

const ebGaramond = EB_Garamond({
  variable: "--font-eb-garamond",
});

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

const advercase = localFont({
  src: [
    { path: "./fonts/Advercase-Regular.woff2", weight: "400" },
    { path: "./fonts/Advercase-Bold.woff2", weight: "700" },
  ],
  variable: "--font-advercase",
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
      <body className={`${is.variable} ${ps.variable} ${anton.variable} ${greatVibes.variable} ${inter.variable} ${ebGaramond.variable} ${advercase.variable} min-h-screen antialiased`}>
        <TooltipProvider>{children}</TooltipProvider>
      </body>
    </html >
  );
}
