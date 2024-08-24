/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,vue,ts}",
  ],
  theme: {
    extend: {
      keyframes: {
        bounceIn: {
          '0%': { transform: 'scale(0.8)', opacity: '0' },
          '80%': { transform: 'scale(1.1)', opacity: '1' },
          '100%': { transform: 'scale(1)' },
        },
        fadeIn: {
          'from': { opacity: '0' },
          'to': { opacity: '1' },
        },
        fadeInUp: {
          'from': { opacity: '0', transform: 'translateY(20px)' },
          'to': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        bounceIn: 'bounceIn 1s ease forwards',
        fadeIn: 'fadeIn 1s ease forwards',
        fadeInUp: 'fadeInUp 1s ease forwards',
      },
    },
  },
  plugins: [],
}
