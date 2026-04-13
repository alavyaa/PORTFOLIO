// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'lotus-green': '#06392c',
        'lotus-green-dark': '#042a20',
        'lotus-gold': '#d4af37',
        'lotus-gold-light': '#e8c84a',
        'lotus-teal': '#00e5ff',
        'lotus-cyan': '#00bcd4',
        'lotus-charcoal': '#1a1a1a',
        'lotus-charcoal-light': '#2a2a2a',
        'lotus-white': '#f0f0f0',
      },
      fontFamily: {
        'cinzel': ['Cinzel', 'serif'],
        'body': ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'grain': "url('/images/grain-texture.png')",
      },
      boxShadow: {
        'glow-gold': '0 0 20px rgba(212, 175, 55, 0.4)',
        'glow-teal': '0 0 20px rgba(0, 229, 255, 0.4)',
        'glow-green': '0 0 20px rgba(6, 57, 44, 0.6)',
      },
      animation: {
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { filter: 'drop-shadow(0 0 8px rgba(212, 175, 55, 0.4))' },
          '50%': { filter: 'drop-shadow(0 0 20px rgba(212, 175, 55, 0.8))' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
    },
  },
  plugins: [],
}