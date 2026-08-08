const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/lib/**/*.{js,ts}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1rem",
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        current: "currentColor",
        transparent: "transparent",
        white: "#FFFFFF",
        primary: "#A15FDC",
        amber: "#D4A043",
        ink: "#14181C",
        surface: "#F3F4F8",
        void: "#110D18",
        muted: "#6B7480",
        border: "#C7CDD6",
      },
      backgroundImage: {
        "blob-a": "radial-gradient(circle at 35% 30%, rgba(161,95,220,0.55), rgba(161,95,220,0) 70%)",
        "blob-b": "radial-gradient(circle at 60% 60%, rgba(161,95,220,0.22), rgba(161,95,220,0) 70%)",
      },
      keyframes: {
        move: {
          "0%, 100%": { transform: "translateY(-10px)" },
          "50%": { transform: "translateY(10px)" },
        },
        twinkle: {
          "0%, 100%": { opacity: "0", transform: "scale(0)" },
          "50%": { opacity: "1", transform: "scale(1)" },
        },
      },
      animation: {
        move: "move 3s ease-in-out infinite",
        twinkle: "twinkle 2.8s ease-in-out infinite",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
