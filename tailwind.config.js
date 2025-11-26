/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'nebula-1': 'nebula1 20s ease-in-out infinite',
        'nebula-2': 'nebula2 25s ease-in-out infinite',
        'nebula-3': 'nebula3 30s ease-in-out infinite',
        'gradient-x': 'gradient-x 3s ease infinite',
        'border-spin': 'border-spin 3s linear infinite',
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        nebula1: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)', opacity: '0.08' },
          '50%': { transform: 'translate(30px, 20px) scale(1.1)', opacity: '0.12' },
        },
        nebula2: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)', opacity: '0.08' },
          '50%': { transform: 'translate(-20px, -30px) scale(1.15)', opacity: '0.1' },
        },
        nebula3: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)', opacity: '0.05' },
          '50%': { transform: 'translate(15px, -15px) scale(1.2)', opacity: '0.08' },
        },
        'gradient-x': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'border-spin': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        'glow-pulse': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(234, 88, 12, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(234, 88, 12, 0.6)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)', opacity: '0.6' },
          '50%': { transform: 'translateY(-10px)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
