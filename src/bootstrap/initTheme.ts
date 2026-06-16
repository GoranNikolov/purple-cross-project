import { useThemeStore } from "@/stores/theme";

/**
 * Initializes theme state (reads localStorage / OS preference and applies the `dark` class to <html>)
 * before the app mounts.
 */
export function initTheme(): void {
  const themeStore = useThemeStore();
  themeStore.init();
}
