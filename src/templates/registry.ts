import type { ComponentType } from "react";
import { ClassicRomanceTheme } from "./classic-romance";
import { ModernLoveTheme } from "./modern-love";
import { VintageCharmTheme } from "./vintage-charm";

export interface ThemeProps {
  slug: string;
  recipientName: string;
  initialContent?: string;
}

export interface ThemeInfo {
  id: string;
  name: string;
  description: string;
  component: ComponentType<ThemeProps>;
}

export const templateRegistry: Record<string, ThemeInfo> = {
  "classic-romance": {
    id: "classic-romance",
    name: "Classic Romance",
    description: "A timeless design with elegant typography and warm tones",
    component: ClassicRomanceTheme,
  },
  "modern-love": {
    id: "modern-love",
    name: "Modern Love",
    description: "Clean and minimal for a contemporary feel",
    component: ModernLoveTheme,
  },
  "vintage-charm": {
    id: "vintage-charm",
    name: "Vintage Charm",
    description: "Antique-inspired with warm sepia tones",
    component: VintageCharmTheme,
  },
};

export function getTheme(id: string | null | undefined): ThemeInfo {
  return templateRegistry[id ?? ""] || templateRegistry["classic-romance"];
}

export const allThemes = Object.values(templateRegistry);
