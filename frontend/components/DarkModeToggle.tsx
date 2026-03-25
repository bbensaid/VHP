"use client";

import { useTheme } from "./ThemeProvider";
import { SunIcon, MoonIcon, ComputerDesktopIcon } from "@heroicons/react/24/outline";

const OPTIONS = [
  { value: "light",  Icon: SunIcon,              label: "Light" },
  { value: "dark",   Icon: MoonIcon,             label: "Dark"  },
  { value: "system", Icon: ComputerDesktopIcon,  label: "System" },
] as const;

/**
 * DarkModeToggle — cycles through light / dark / system themes.
 * Compact single-button variant: click to cycle.
 */
export default function DarkModeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();

  function cycle() {
    const order: typeof theme[] = ["light", "dark", "system"];
    const next = order[(order.indexOf(theme) + 1) % order.length];
    setTheme(next);
  }

  const current = OPTIONS.find((o) => o.value === theme) ?? OPTIONS[2];
  const Icon = current.Icon;

  return (
    <button
      onClick={cycle}
      title={`Theme: ${current.label}`}
      aria-label={`Toggle theme (currently ${current.label})`}
      className={`p-2 rounded-lg transition-colors ${
        resolvedTheme === "dark"
          ? "text-slate-300 hover:bg-slate-700 hover:text-white"
          : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
      }`}
    >
      <Icon className="w-4 h-4" />
    </button>
  );
}
