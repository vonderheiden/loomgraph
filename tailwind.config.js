/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bento-bg': '#F9FAFB',
        'bento-border': '#E5E7EB',
        'bento-card': '#FFFFFF',
        'action-primary': '#3B82F6',
        'action-secondary': '#8B5CF6',
      },
      boxShadow: {
        'soft': '0 1px 3px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.1)',
        'soft-lg': '0 4px 6px rgba(0, 0, 0, 0.05), 0 2px 4px rgba(0, 0, 0, 0.06)',
      },
      borderRadius: {
        'bento': '12px',
      },
    },
  },
  plugins: [],
}
