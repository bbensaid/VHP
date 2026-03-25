"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark" | "system";

interface ThemeContextValue {
  theme: Theme;
  resolvedTheme: "light" | "dark";
  setTheme: (t: Theme) => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: "system",
  resolvedTheme: "light",
  setTheme: () => {},
});

export function useTheme() {
  return useContext(ThemeContext);
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("system");
  const [resolvedTheme, setResolvedTheme] = useState<"light" | "dark">("light");

  // On mount, read persisted preference
  useEffect(() => {
    const stored = localStorage.getItem("htr-theme") as Theme | null;
    setThemeState(stored ?? "system");
  }, []);

  // Apply class to <html> whenever theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const systemDark = mediaQuery.matches;

    const resolved = theme === "system" ? (systemDark ? "dark" : "light") : theme;
    setResolvedTheme(resolved);

    document.documentElement.classList.toggle("dark", resolved === "dark");

    const onSystemChange = (e: MediaQueryListEvent) => {
      if (theme === "system") {
        const newResolved = e.matches ? "dark" : "light";
        setResolvedTheme(newResolved);
        document.documentElement.classList.toggle("dark", e.matches);
      }
    };

    mediaQuery.addEventListener("change", onSystemChange);
    return () => mediaQuery.removeEventListener("change", onSystemChange);
  }, [theme]);

  function setTheme(t: Theme) {
    setThemeState(t);
    localStorage.setItem("htr-theme", t);
  }

  return (
    <ThemeContext.Provider value={{ theme, resolvedTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
