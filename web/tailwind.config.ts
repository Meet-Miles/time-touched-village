import type { Config } from "tailwindcss"

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic":
                    "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            },
            fontFamily: {
                platform: ["var(--font-platform)"],
            },
            colors: {
                red: "#F9423A",
                darkRed: "#50110E",
                green: "#2DE160",
                darkGreen: "#0A431A",
                blue: "#2DD6E1",
                darkBlue: "#0A3A3E",
                yellow: "#FFCA0F",
                darkYellow: "#413300",
            },
            keyframes: {
                bounce: {
                    "0%, 100%": { transform: "translateY(-10px)" },
                    "50%": { transform: "rotate(2deg)" },
                },
            },
        },
    },
    plugins: [],
}
export default config
