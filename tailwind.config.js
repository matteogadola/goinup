/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      animation: {
        fadeIn: 'fadeIn 2s ease-in forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
      },
      variants: {
        animation: ['motion-safe'],
      },
      spacing: {
        88: '22rem',
        128: '32rem',
        256: '64rem',
      },
      backgroundImage: {
        'cover-image': "linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.6)), url('/images/header.jpg')", // elimina
        'hero-pattern': "url('/img/hero-pattern.svg')",
        'footer-texture': "url('/img/footer-texture.png')",
      },
      fontFamily: {
        unbounded: ['var(--font-unbounded)'],
        poppins: ['var(--font-poppins)'],
      },
      colors: {
        /* https://coolors.co/7fb069-fffdda-e6aa68-ca3c25-262410 */
        /*'primary': '#e6aa68',
        'accent': '#7fb069',
        'title': '#262410',
        'button': '#ca3c25',
        'background': '#FFFDDA',*/
        primary: '#e6aa68',
        accent: '#6FB06A',
        'accent-dark': '#649960',
        heading: '#2B1505',
        link: '#1C000B',
        button: '#2292a4',
        background: '#f4f4f9',
      },
    },
  },
  plugins: [],
};
