/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        
        first: {
          DEFAULT: "#6366F1",
          dark: "#4F46E5",
          light: "#A5B4FC",
        },
        second: {
          DEFAULT: "#EC4899",
          dark: "#DB2777",
          light: "#F9A8D4",
        },
        end: {
          DEFAULT: "#8B5CF6",
          dark: "#7C3AED",
          light: "#DDD6FE",
        },
        background: {
          DEFAULT: "#F9FAFB",
          soft: "#F3F4F6",
          dark: "#111827",
        },
        white: {
          DEFAULT: "#ffffff",
          soft: "#fdfdfd",
          subtle: "#f5f5f5",
        },
        text: {
          base: "#1F2937",
          muted: "#6B7280",
        },
      },
    },  },
  plugins: [],
};
export default config;
