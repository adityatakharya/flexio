/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  daisyui: {
    darkTheme: "dark",
    lightTheme: "dark",
  },
  theme: {
    extend: {
      colors: {
        blackalpha: 'rgba(0, 0, 0, 0.5)', // Adjust opacity as needed
        'blackalpha-hover': 'rgba(0, 0, 0, 0.6)', // Hover state color
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
  theme: {
    extend: {
      colors: {
        base: {
          100: "#1d232a", // Dark mode base color
        },
      },
    },
  },
  // Define the light mode base colors
  lightTheme: {
    colors: {
      base: {
        100: "#1d232a", // Light mode base color
      },
    },
  },
};