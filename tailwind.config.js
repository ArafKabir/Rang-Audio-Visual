// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class',
    content: [
        './index.html',
        './app/**/*.{js,ts,jsx,tsx}',
        './src/**/*.{js,ts,jsx,tsx}',
        './app/app.css',
    ],
    theme: {
        extend: {},
    },
    plugins: [],
};