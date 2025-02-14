/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        lift: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-2px)' }, // Adjust -2px for subtlety
        }
      },
      animation: {
        lift: 'lift 2s ease-in-out infinite alternate', // alternate for smooth back and forth
      }
    },
  },
  plugins: [],
}

