/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      boxShadow: {
        'glass': '0 8px 32px rgba(0,0,0,0.1)',
        'neo': '8px 8px 16px #d1d5db, -8px -8px 16px #ffffff',
        'neo-dark': '8px 8px 16px #0f172a, -8px -8px 16px #1e293b',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          'from': { boxShadow: '0 0 20px rgba(99,102,241,0.4)' },
          'to': { boxShadow: '0 0 40px rgba(99,102,241,0.8)' },
        },
      },
    },
  },
  plugins: [],
}
