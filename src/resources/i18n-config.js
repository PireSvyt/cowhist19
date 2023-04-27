import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// https://www.freecodecamp.org/news/how-to-add-localization-to-your-react-app/

i18n.use(initReactI18next).init({
  fallbackLng: "en",
  lng: "en",
  resources: {
    en: {
      translations: require("./i18n-EN.json")
    },
    fr: {
      translations: require("./i18n-FR.json")
    }
  },
  ns: ["translations"],
  defaultNS: "translations"
});

i18n.languages = ["en", "fr"];

export default i18n;
