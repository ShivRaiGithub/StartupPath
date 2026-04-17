import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#fef9f1",
        surface: "#fef9f1",
        "surface-bright": "#fef9f1",
        "surface-container-lowest": "#ffffff",
        "surface-container-low": "#f8f3eb",
        "surface-container": "#f2ede5",
        "surface-container-high": "#ece8e0",
        "surface-container-highest": "#e7e2da",
        "surface-dim": "#ded9d2",
        "surface-variant": "#e7e2da",
        primary: "#3525cd",
        "primary-container": "#4f46e5",
        "primary-fixed": "#e2dfff",
        "primary-fixed-dim": "#c3c0ff",
        "on-primary": "#ffffff",
        secondary: "#636036",
        "secondary-container": "#e9e5b0",
        "secondary-fixed": "#e9e5b0",
        "secondary-fixed-dim": "#cdc996",
        "on-secondary": "#ffffff",
        "on-secondary-container": "#69663c",
        "on-secondary-fixed": "#1e1c00",
        "on-secondary-fixed-variant": "#4a4821",
        "on-surface": "#1d1c17",
        "on-surface-variant": "#464555",
        "on-background": "#1d1c17",
        outline: "#777587",
        "outline-variant": "#c7c4d8",
        error: "#ba1a1a",
        tertiary: "#524735",
        "tertiary-container": "#6b5e4c",
        "tertiary-fixed": "#f2e0c8",
        "inverse-surface": "#32302b",
        "inverse-on-surface": "#f5f0e8",
        "inverse-primary": "#c3c0ff",
      },
      fontFamily: {
        headline: ["Epilogue", "sans-serif"],
        body: ["Inter", "sans-serif"],
        label: ["Inter", "sans-serif"],
        handwritten: ["Caveat", "cursive"],
      },
      borderRadius: {
        DEFAULT: "0.125rem",
        lg: "0.25rem",
        xl: "0.5rem",
        full: "0.75rem",
      },
    },
  },
};

export default config;
