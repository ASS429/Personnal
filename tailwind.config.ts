import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

export default {
  darkMode: ["class", '[data-theme="dark"]'],
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        surface: "var(--surface)",
        raised: "var(--raised)",
        line: "var(--border)",
        ink: "var(--ink)",
        muted: "var(--muted)",
        faint: "var(--faint)",
        accent: "var(--accent)",
        "accent-ink": "var(--accent-ink)",
        "accent-onvideo": "var(--accent-onvideo)",
        "accent-onvideo-ink": "var(--accent-onvideo-ink)",
      },
      fontFamily: {
        display: ['"Petrona"', "Georgia", "serif"],
        sans: ['"Archivo"', "ui-sans-serif", "system-ui", "sans-serif"],
      },
      fontSize: {
        "fluid--1": "var(--step--1)",
        "fluid-0": "var(--step-0)",
        "fluid-1": "var(--step-1)",
        "fluid-2": "var(--step-2)",
        "fluid-3": "var(--step-3)",
        "fluid-4": "var(--step-4)",
        "fluid-5": "var(--step-5)",
      },
      transitionTimingFunction: {
        "out-quint": "cubic-bezier(0.22, 1, 0.36, 1)",
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      zIndex: {
        veil: "10",
        content: "20",
        sticky: "30",
        nav: "40",
      },
      maxWidth: {
        measure: "68ch",
      },
    },
  },
  plugins: [tailwindcssAnimate],
} satisfies Config;
