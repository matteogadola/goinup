import type { Config } from 'tailwindcss'

export default {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        /* https://coolors.co/7fb069-fffdda-e6aa68-ca3c25-262410 */
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: '#CEDFD9',//'#e6aa68',
        accent: '#6FB06A',
        'accent-dark': '#649960',
        heading: '#2B1505',
        link: '#1C000B',
        button: '#2292a4',
      },
      fontFamily: {
        unbounded: ['var(--font-unbounded)'],
        poppins: ['var(--font-poppins)'],
      },
    },
  },
  plugins: [],
} satisfies Config;
