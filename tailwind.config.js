import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        sm: "320px", // 모바일
        md: "600px", // 태블릿
        lg: "1200px",
        xl: "1536px",
      },
    },
  },
  daisyui: {
    themes: ["light", "dark", "cupcake"], //테마 많으니까 원하는거 고르세유
  },
  plugins: [daisyui],
};
