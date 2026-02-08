/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-roboto)', 'Arial', 'sans-serif'],
      },
      colors: {
        brand: {
          50: '#cef7ff',  // User provided: pale cyan
          100: '#9defe2', // User provided: light teal
          200: '#9defe2',
          300: '#0ea6de', // User provided: cyan blue
          400: '#0490fa', // User provided: main blue
          500: '#0490fa', // Main
          600: '#0490fa',
          700: '#09438d', // User provided: dark blue
          800: '#266b7d', // User provided: teal/dark cyan
          900: '#09438d',
          950: '#09438d',
        },
        medical: {
          blue: '#09438d', // User provided: dark blue for text/headings
          teal: '#266b7d', // User provided: teal for accents
          slate: '#cef7ff', // User provided: pale cyan for backgrounds
        }
      },
      backgroundImage: {
        'gradient-premium': 'linear-gradient(135deg, #0490fa 0%, #0ea6de 100%)',
        'gradient-soft': 'linear-gradient(180deg, #cef7ff 0%, #ffffff 100%)',
      },
      borderRadius: {
        'premium': '1.25rem',
      },
      boxShadow: {
        'soft': '0 10px 30px -5px rgba(0, 0, 0, 0.05), 0 10px 10px -5px rgba(0, 0, 0, 0.02)',
        'premium': '0 20px 40px -15px rgba(4, 144, 250, 0.15)',
      }
    },
  },
  plugins: [],
}
