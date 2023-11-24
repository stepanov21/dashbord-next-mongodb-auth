import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./ui/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      borderRadius: {
        main: "5px",
      },
      colors: {
        milk: "#F5E8DF",
        green: "#D4E95E",
        greenDark: "#7E9115",
        blue: "#7CBDC7",
        yellow: "#F1D304",
        gray: "#3C3C3D",
        darlGray: "#2E2E30"
      }
    },
    screens: {
      "2xl": { max: "1535px" },
      // => @media (max-width: 1535px) { ... }

      xl: { max: "1200px" },
      // => @media (max-width: 1279px) { ... }

      lg: { max: "1023px" },
      // => @media (max-width: 1023px) { ... }

      sm: { max: "801px" },
      // => @media (max-width: 639px) { ... }
    },
  },
  safelist: [
    "bg-[#7cbdc7]",
    "bg-[#f1d304]",
    "bg-[#d8e764]",
    "bg-[#c77cc4]",
    "bg-[#e76464]",
    "bg-[#7c7fc7]",
    "bg-[#c14953]"
  ],
  plugins: [],
};
export default config;
