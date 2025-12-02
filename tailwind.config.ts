import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                // Rivendell Palette
                'moonlit-silver': '#E7F5F2',
                'elven-mist-white': '#CCD9D5',
                'emerald-leaf': '#4DAA78',
                'starlight-gold': '#D6C48B',
                'silver-gleam': '#C3E6E1',
                'pale-moon-cyan': '#9AD7CB',
                'deep-forest': '#0B2B26',
                'muted-brass': '#C0B283',

                // Background colors
                'deep-river-teal': '#2F4C58',
                'mithril-silver': '#E0ECEF',
            },
            fontFamily: {
                cinzel: ['var(--font-cinzel)', 'serif'],
                cormorant: ['var(--font-cormorant)', 'serif'],
                serif: ['var(--font-eb-garamond)', 'serif'],
                decorative: ['var(--font-cinzel)', 'serif'],
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(circle, var(--tw-gradient-stops))',
            },
            backdropBlur: {
                'glass': '16px',
                'glass-heavy': '24px',
            },
            animation: {
                'spin-slow': 'spin 8s linear infinite',
                'float': 'float 6s ease-in-out infinite',
                'pulse-slow': 'pulse 3s ease-in-out infinite',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-20px)' },
                },
            },
        },
    },
    plugins: [],
};

export default config;
