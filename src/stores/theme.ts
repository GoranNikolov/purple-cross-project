import { defineStore } from "pinia";
import type { ThemeMode } from "@/types/theme";

const STORAGE_KEY = "purple-cross-theme";

function getInitialMode(): ThemeMode {
  const stored = localStorage.getItem(STORAGE_KEY) as ThemeMode | null;

  if (stored === "light" || stored === "dark") return stored;

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function applyMode(mode: ThemeMode) {
  document.documentElement.classList.toggle("dark", mode === "dark");
}

export const useThemeStore = defineStore("theme", {
  state: () => ({
    mode: getInitialMode() as ThemeMode,
  }),

  actions: {
    init() {
      applyMode(this.mode);
    },

    toggle() {
      this.setMode(this.mode === "dark" ? "light" : "dark");
    },

    setMode(mode: ThemeMode) {
      this.mode = mode;
      applyMode(mode);
      localStorage.setItem(STORAGE_KEY, mode);
    },
  },
});
