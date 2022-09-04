module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'bg-collection': "url('/images/bg-collection')",
      },
      colors: {
        muted: '#E0E3FF',
        primary: '#0EA8D6',
        accent: '#727698',
        border: '#2E357B',
        darkBg: '#161A42'
      }
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}
