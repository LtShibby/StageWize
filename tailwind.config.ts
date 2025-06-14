import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  safelist: [
    'border-l-blue-500',
    'border-l-yellow-500', 
    'border-l-orange-500',
    'border-l-green-500',
    'border-l-red-500',
    'border-l-gray-500',
    'bg-blue-500/10',
    'bg-yellow-500/10',
    'bg-orange-500/10', 
    'bg-green-500/10',
    'bg-red-500/10',
    'border-blue-500',
    'border-yellow-500',
    'border-orange-500', 
    'border-green-500',
    'border-red-500',
    'bg-opacity-20',
    'line-clamp-2'
  ],
  theme: {
    extend: {
      colors: {
        'electric-blue': '#0080FF',
        'electric-yellow': '#FFFF00',
        'dark-bg': '#0a0a0a',
        'card-bg': '#1a1a1a',
        'border-gray': '#2a2a2a',
      },
      fontFamily: {
        'anton': ['Anton', 'sans-serif'],
        'montserrat': ['Montserrat', 'sans-serif'],
      },
      backgroundImage: {
        'grain': 'url("data:image/svg+xml,%3Csvg viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg"%3E%3Cfilter id="noiseFilter"%3E%3CfeTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" stitchTiles="stitch"/%3E%3C/filter%3E%3Crect width="100%25" height="100%25" filter="url(%23noiseFilter)" opacity="0.05"/%3E%3C/svg%3E")',
      },
      opacity: {
        '20': '0.2',
      }
    },
  },
  plugins: [],
}
export default config 