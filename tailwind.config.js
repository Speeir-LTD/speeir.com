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
        // Blog cover fallbacks. Each is self-contained (two brand radials over
        // a tinted base) so consumers don't need extra bg-position/size classes.
        "cover-1": [
          "radial-gradient(circle at 18% 12%, rgba(161,95,220,0.55), rgba(161,95,220,0) 58%)",
          "radial-gradient(circle at 88% 82%, rgba(212,160,67,0.30), rgba(212,160,67,0) 55%)",
          "linear-gradient(140deg, #1B1030 0%, #110D18 100%)",
        ].join(","),
        "cover-2": [
          "radial-gradient(circle at 82% 18%, rgba(161,95,220,0.48), rgba(161,95,220,0) 55%)",
          "radial-gradient(circle at 20% 85%, rgba(212,160,67,0.24), rgba(212,160,67,0) 58%)",
          "linear-gradient(140deg, #14181C 0%, #1B1226 100%)",
        ].join(","),
        "cover-3": [
          "radial-gradient(circle at 50% 22%, rgba(161,95,220,0.50), rgba(161,95,220,0) 62%)",
          "radial-gradient(circle at 12% 88%, rgba(212,160,67,0.22), rgba(212,160,67,0) 55%)",
          "linear-gradient(160deg, #110D18 0%, #171A22 100%)",
        ].join(","),
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
