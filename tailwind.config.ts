import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: 'class',
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        shimmer: 'shimmer 1.5s infinite',
      },
      keyframes:{
        shimmer: {
          '0%': {
            backgroundPosition: '-200% 0',
          },
          '100%': {
            backgroundPosition: '200% 0',
          },
        },
      },
      colors: {
        'primary-bg': '#F7F7F7',
        'secondary-bg': '#FFFFFF',
        'primary-text': '#333333',
        'secondary-text': '#666666',
      },
      gradientColorStops: {
        'start': '#F7F7F7',
        'end': '#FFFFFF',
      },
    },
  },
  variants: {},
  plugins: [],
};
export default config;
