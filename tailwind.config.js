/** @type {import('tailwindcss').Config} */
export default {
  content: ["./*.html", "./src/contentScript/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  prefix: "lf-",
  plugins: [],
};
