import type { Config } from 'tailwindcss';

const config: Config = {
    darkMode: 'class',
    content: [
        "./index.html",
        "./src/**/*.{vue,js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
        // Aquí puedes extender la configuración de temas
        },
    },
    plugins: [
        // Agrega aquí los plugins que necesites
    ],
};

export default config;