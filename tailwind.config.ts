import type { Config } from 'tailwindcss'
import forms from '@tailwindcss/forms'

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        btn: '#FF7170',
        'btn-hover': '#FF9C9B',
        'btn-focus': '#FE5250',
        'btn-secondary': '#5F037E',
        'btn-secondary-hover': '#6B048C',
        'btn-secondary-focus': '#540474',
        'modal-bg': '#4A0267',
        'modal-overlay': '#3C0054',
        border: '#8A06BF',
        tab: '#4E036C',
        price: '#209B25',
        delete: '#FF7070',
      },
    },
  },
  plugins: [forms()],
} satisfies Config
