/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          950: '#0c1b17',
          900: '#122b24',
          800: '#17332c', // primary dark ink
          700: '#1e443a',
          600: '#28584c',
          500: '#326c5e',
        },
        cream: {
          50: '#ffffff',
          100: '#fbfaf5', // base warm paper
          200: '#f5f2e8',
          300: '#ede8dc',
          400: '#ded7c6',
        },
        sage: {
          50: '#f6f9f5',
          100: '#e8eee5', // base sage
          200: '#d5e0d1',
          300: '#b8ccb2',
          400: '#8fad87',
          500: '#5b8266',
          600: '#287053', // primary verified green
          700: '#1f5942',
        },
        coral: {
          50: '#fef5f2',
          100: '#feeae4',
          200: '#fed5ca',
          300: '#fbaea0',
          400: '#f67e69',
          500: '#ed7252', // primary coral accent
          600: '#db5331',
          700: '#b83f22',
        },
        sand: '#d7ded6',
        ink: '#17332c',
        muted: '#5a756d',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['"DM Mono"', 'Menlo', 'monospace'],
      },
      boxShadow: {
        'soft': '0 8px 30px rgba(23, 51, 44, 0.06)',
        'lifted': '0 16px 40px -8px rgba(23, 51, 44, 0.12)',
        'retro': '8px 8px 0px 0px #d5e0d1',
        'retro-coral': '8px 8px 0px 0px #fbaea0',
        'retro-forest': '10px 10px 0px 0px #17332c',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 4s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        }
      }
    },
  },
  plugins: [],
}

