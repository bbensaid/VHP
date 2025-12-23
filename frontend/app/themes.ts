// app/config/themes.ts

/**
 * Centralized theme configuration for the application.
 * This object maps semantic theme names to specific Tailwind CSS classes.
 * Using "as const" provides stricter typing, allowing us to infer ThemeName.
 */
export const themeMap = {
  blue: {
    title: "text-blue-700",
    link: "text-blue-500 hover:text-blue-700",
  },
  green: {
    title: "text-green-700",
    link: "text-green-500 hover:text-green-700",
  },
  indigo: {
    title: "text-indigo-700",
    link: "text-indigo-500 hover:text-indigo-700",
  },
} as const;

/**
 * A type representing the valid names of themes available in the themeMap.
 * This is inferred from the keys of the themeMap object.
 */
export type ThemeName = keyof typeof themeMap;
