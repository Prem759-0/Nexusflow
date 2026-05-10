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
      colors: {
        // Custom dark surface colors
        dark: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#1e293b',
          800: '#0f172a',
          850: '#0b1120',
          900: '#080d18',
          950: '#04070c',
        },
        primary: {
          50: '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
        },
      },
      boxShadow: {
        glass: '0 8px 32px rgba(0, 0, 0, 0.08)',
        'glass-lg': '0 16px 48px rgba(0, 0, 0, 0.12)',
        'dark-glass': '0 8px 32px rgba(0, 0, 0, 0.5)',
        'dark-glass-lg': '0 16px 48px rgba(0, 0, 0, 0.7)',
        neo: '8px 8px 16px #d1d5db, -8px -8px 16px #ffffff',
        'neo-dark': '8px 8px 16px #020617, -8px -8px 16px #1e293b',
        glow: '0 0 30px rgba(99, 102, 241, 0.4)',
        'glow-lg': '0 0 60px rgba(99, 102, 241, 0.6)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'dark-glow':
          'radial-gradient(ellipse at top left, rgba(99,102,241,0.15), transparent 50%), radial-gradient(ellipse at bottom right, rgba(99,102,241,0.05), transparent 50%)',
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        glow: 'glow 3s ease-in-out infinite alternate',
        'bg-shift': 'bg-shift 15s ease infinite',
        'fade-in': 'fade-in 0.5s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          from: { boxShadow: '0 0 20px rgba(99,102,241,0.4)' },
          to: { boxShadow: '0 0 40px rgba(99,102,241,0.8)' },
        },
        'bg-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'fade-in': {
          from: { opacity: '0', transform: 'translateY(10px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
