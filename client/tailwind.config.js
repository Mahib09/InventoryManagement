/** @type {import('tailwindcss').Config} */
import { createThemes } from "tw-colors";
import * as tailwindColors from "tailwindcss/colors"; // Import all colors

const baseColors = [
  "gray",
  "red",
  "yellow",
  "green",
  "blue",
  "indigo",
  "purple",
  "pink",
];

const shadeMapping = {
  50: "900",
  100: "800",
  200: "700",
  300: "600",
  400: "500",
  500: "400",
  600: "300",
  700: "200",
  800: "100",
  900: "50",
};

const generateThemeObject = (colors, mapping, invert = false) => {
  const theme = {};
  baseColors.forEach((color) => {
    if (colors[color]) {
      theme[color] = {};
      Object.entries(mapping).forEach(([key, value]) => {
        const shadeKey = invert ? value : key;
        theme[color][key] = colors[color][shadeKey];
      });
    } else {
      console.warn(`Color ${color} is not defined in the colors object.`);
    }
  });
  return theme;
};

const lightTheme = generateThemeObject(tailwindColors, shadeMapping);
const darkTheme = generateThemeObject(tailwindColors, shadeMapping, true);

const themes = {
  light: {
    ...lightTheme,
    white: "#ffffff",
  },
  dark: {
    ...darkTheme,
    white: tailwindColors.gray ? tailwindColors.gray["950"] : "#000000",
    black: tailwindColors.gray ? tailwindColors.gray["50"] : "#ffffff",
  },
};

module.exports = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [createThemes(themes)],
};
