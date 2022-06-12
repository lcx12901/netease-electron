import { defineConfig } from 'windicss/helpers'

export default defineConfig({
    attributify: true,
    darkMode: 'class',
    transformCSS: 'pre',
    theme: {
    },
    plugins: [
        require('@windicss/plugin-scrollbar')
    ],
})