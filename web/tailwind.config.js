/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}'
    ],
    theme: {
        extend: {
            backgroundImage: {
                'goodbye': "url('/goodbye.gif')",
            }
        },
        textFillColor: theme => theme('borderColor'),
        textStrokeColor: theme => theme('borderColor'),
        textStrokeWidth: theme => theme('borderWidth'),
        paintOrder: {
            'fsm': { paintOrder: 'fill stroke markers' },
            'fms': { paintOrder: 'fill markers stroke' },
            'sfm': { paintOrder: 'stroke fill markers' },
            'smf': { paintOrder: 'stroke markers fill' },
            'mfs': { paintOrder: 'markers fill stroke' },
            'msf': { paintOrder: 'markers stroke fill' },
        },
    },
    variants: { // all the following default to ['responsive']
        textFillColor: ['responsive'],
        textStrokeColor: ['responsive'],
        textStrokeWidth: ['responsive'],
        paintOrder: ['responsive'],
    },
    plugins: [
        require("daisyui"),
        require('tailwindcss-text-fill-stroke')(), // no options to configure
    ],
    daisyui: {
        themes: false,
    },
}
