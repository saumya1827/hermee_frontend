/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        luxuryGold: "#D4AF37",       // main gold
        luxuryCream: "#FFF8E7",      // soft background
        luxuryBrown: "#4B2E2E",      // deep brown for text or sections
        luxuryBeige: "#E6D5B8",      // subtle luxury shade
        luxuryDark: "#1F1F1F",       // for dark backgrounds
      },
      fontFamily: {
        brand: ["Playfair Display", "serif"],  // classy serif font
        sansBrand: ["Lato", "sans-serif"]     // clean sans for buttons/text
      }
    },
  },
  plugins: [],
}
