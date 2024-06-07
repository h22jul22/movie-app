/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{html,js,jsx,tsx}'],
    theme: {
        extend: {
            dropShadow: {
                '3xl': [
                    '1px 1px 0px rgba(15, 15, 15, 0.8)',
                    '2px 2px 0px rgba(15, 15, 15, 0.7)',
                    '3px 3px 0px rgba(15, 15, 15, 0.6)',
                    '4px 4px 0px rgba(15, 15, 15, 0.5)',
                    '5px 5px 0px rgba(15, 15, 15, 0.4)',
                ],
            },
        },
        fontFamily: {
            poppins: ['Poppins', 'sans-serif', 'monospace'],
        },
        screens: {
            sm: { max: '768px' },
            // => @media (min-width: 576px) { ... }

            md: { max: '1279px' },
            // => @media (min-width: 960px) { ... }

            lg: '1280px',
            // => @media (min-width: 1440px) { ... }
            xl: '1640px',
        },
        important: true,
    },
    plugins: [],
};
