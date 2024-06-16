/*
--token-205ada91-f441-4a90-9fdc-9854b313f6b4: rgb(10, 10, 10);
    --token-b92efc33-3246-4525-adc1-724299866d2f: rgb(255, 69, 51);
    --token-5952c664-c824-4d7e-8949-77447080c60d: rgb(255, 34, 14);
    --token-195ca2ff-95dc-4d7d-bb9a-c5fb1e041116: rgb(252, 252, 250);
    --token-9e43930e-97a2-4cb9-bfb7-3ad05c517cd4: rgb(153, 153, 153);
    --token-af7273d3-1fb6-4796-9326-48ad035c57d2: rgba(255, 255, 255, .1);
    --token-b02f73c3-0c77-4fa1-b52e-eca57fd70529: rgb(13, 13, 13);
*/
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        background: "rgb(10, 10, 10)",
        primary: "rgb(255, 69, 51)",
        "primary-accent": "rgb(255, 34, 14)",
        foreground: "rgb(252, 252, 250)",
        "foreground-muted": "rgb(153, 153, 153)",
      },
      boxShadow: {
        "primary-outline":
          "rgba(0, 0, 0, 0.05) 0px 4px 10px -2px, rgba(0, 0, 0, 0.1) 0px 2px 2px -1px, rgba(255, 34, 14, 0.32) 0px 0px 0px 5px",
        "white-outline":
          "rgba(0, 0, 0, 0.05) 0px 4px 10px -2px, rgba(0, 0, 0, 0.1) 0px 2px 2px -1px, rgba(255, 255, 255, 0.05) 0px 0px 0px 5px",
      },
      animation: {
        "spin-slow": "hero-spin 10s linear infinite",
        "border-beam": "border-beam calc(var(--duration)*1s) infinite linear",
        backgroundPositionSpin:
          "background-position-spin 3000ms infinite alternate",
      },
      keyframes: {
        "background-position-spin": {
          "0%": { backgroundPosition: "top center" },
          "100%": { backgroundPosition: "bottom center" },
        },
        "border-beam": {
          "100%": {
            "offset-distance": "100%",
          },
        },
        "hero-spin": {
          // Accept all tailwind transformations
          "0%": {
            transform:
              "translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(0deg) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))",
          },
          "100%": {
            transform:
              "translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(360deg) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))",
          },
        },
      },
    },
  },
  plugins: [],
};
