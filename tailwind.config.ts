import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        btn: '#FF7170',
        'btn-hover': '#FF9C9B',
        'btn-focus': '#FE5250',
        border: '#8A06BF',
        tab: '#4E036C',
        list: '#540474',
        price: '#209B25',
      },
    },
  },
  plugins: [],
} satisfies Config
