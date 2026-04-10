import { defineConfig } from 'vite';
import { resolve } from 'path';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
    plugins: [tailwindcss()],
    resolve: {
        alias: {
            '@': resolve(__dirname, 'src'),
        },
    },
    css: {
        postcss: {
            plugins: [
                require('tailwindcss')({
                    content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
                    theme: {
                        extend: {
                            colors: {
                                primary: '#0d0d0d', // deep black
                                accent: '#00ffff', // neon cyan
                                secondary: '#1a1a2e', // dark slate
                                highlight: '#ff00ff', // neon magenta
                            },
                            fontFamily: {
                                sans: ['"Inter"', 'system-ui', 'sans-serif'],
                                mono: ['"Roboto Mono"', 'monospace'],
                            },
                        },
                    },
                    plugins: [],
                }),
                require('autoprefixer'),
            ],
        },
    },
});
