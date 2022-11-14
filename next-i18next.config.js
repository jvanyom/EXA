const supportedLanguages = ["es", "fr", "en"];

/**
 * @type {import("next-i18next").UserConfig}
 */
module.exports = {
    reloadOnPrerender: process.env.NODE_ENV === "development",
    i18n: {
        locales: supportedLanguages,
        defaultLocale: supportedLanguages[0]
    },
    load: "languageOnly",
    supportedLngs: supportedLanguages,
    nonExplicitSupportedLngs: true,
    interpolation: {
        escapeValue: false
    },
    react: {
        useSuspense: false
    }
};
