// eslint-disable-next-line @typescript-eslint/no-var-requires
const plugin = require("tailwindcss/plugin");

/** @type {import("tailwindcss").Config} */
module.exports = {
    content: ["./src/pages/**/*.{ts,tsx}", "./src/components/**/*.{ts,tsx}"],
    theme: {
        extend: {
            colors: {
                primary: "#0B7B75",
                secondary: "#3D2B3D",
                tertiary: "#FCF5BC",
                light: "#6A706E",
                smooth: "#ADB4B6",
                "light-smooth": "#F0F0F0"
            },
            fontFamily: {
                primary: "Quicksand",
                secondary: "Libre Franklin",
                dosis: "Dosis",
                inter: "Inter"
            },
            spacing: {
                "1/8": "12%"
            }
        }
    },
    plugins: [
        require("@tailwindcss/aspect-ratio"),
        require("@tailwindcss/typography"),
        require("@tailwindcss/line-clamp"),
        require("@tailwindcss/forms"),
        plugin(({ addVariant }) => {
            addVariant("not-last", ["&:not(:last-child)"]);
        })
    ]
};
