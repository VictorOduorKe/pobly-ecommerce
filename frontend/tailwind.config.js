module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brown: {
          900: '#180501', // rich dark brown
          700: '#701705', // warm earthy sienna
        },
        sienna: {
          500: '#701705', // warm earthy sienna
        },
        gray: {
          900: '#181818',
          100: '#F5F5F5',
        },
        white: '#FFFFFF',
      },
      fontFamily: {
        serif: ['Merriweather', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
      keyframes: {
        fadein: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
      },
      animation: {
        fadein: 'fadein 0.7s ease-in',
      },
    },
  },
  plugins: [],
}
