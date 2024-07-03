import type { Config } from "tailwindcss";

const config: Config = {
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
    colors: {
      sider_black: "#141414",
      chat_gray: "#282828",
      olive: "#3c3c3c",
      purple_arsenic: "#3c3c50",
      purple_gunmetal: "#28283c",
      green_pine_tree: "#282814",
      white: "#FFFFFF",
    },
  },
  plugins: [],
};
export default config;
