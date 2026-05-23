import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
    "./server/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#17202a",
        paper: "#f6f3ee",
        steel: "#2d5f73",
        moss: "#567a55",
        amber: "#c98635",
        coral: "#c95f54",
        bluewash: "#dfeff1",
        sagewash: "#e8efe1",
        line: "#e4ded4"
      },
      boxShadow: {
        soft: "0 18px 50px rgba(23, 32, 42, 0.08)"
      }
    }
  },
  plugins: []
};

export default config;
