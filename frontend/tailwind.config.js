/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                primary: "var(--primary)",
                secondary: "var(--secondary)",
                foreground: "var(--text)",
                subtitle: "var(--subtitle)",
                border: "var(--border)",
                accent: "var(--accent)",
                // Mapping 'blue' to accent for backward compatibility with existing components
                blue: "var(--accent)",
            },
            container: {
                center: true,
                padding: "2rem",
                screens: {
                    "2xl": "1400px",
                },
            },
            animation: {
                wave: 'wave 2.5s infinite',
            },
            keyframes: {
                wave: {
                    '0%, 100%': { transform: 'rotate(0deg)' },
                    '25%': { transform: 'rotate(20deg)' },
                    '75%': { transform: 'rotate(-15deg)' },
                }
            }
        },
    },
    plugins: [],
}
