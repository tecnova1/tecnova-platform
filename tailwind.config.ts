import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        tecnova: {
          bg: '#070c18',
          surface: '#0f172a',
          card: '#0b1329',
          border: '#1e293b',
          emerald: '#10b981',
          blue: '#1f4e79',
          muted: '#94a3b8'
        }
      }
    },
  },
  plugins: [],
};
export default config;