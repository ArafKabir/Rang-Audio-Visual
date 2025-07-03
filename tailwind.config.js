// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class',
    content: [
        './index.html',
        './app/**/*.{js,ts,jsx,tsx}',   // adjust if your source path differs
        './src/**/*.{js,ts,jsx,tsx}',
        './app/app.css',                // ← make sure the css file itself is listed
    ],
    theme: {},
    plugins: [],
}