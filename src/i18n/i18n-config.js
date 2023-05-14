import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// https://www.freecodecamp.org/news/how-to-add-localization-to-your-react-app/
// https://www.tabnine.com/code/javascript/functions/i18next/i18n/changeLanguage

// Language reset on refresh
import Cookies from "js-cookie";
let language = Cookies.get("cowhist19_language");
if (language === undefined) {
  language = "enGB";
}

i18n.use(initReactI18next).init({
  fallbackLng: "enGB",
  lng: language,
  resources: {
    enGB: {
      translations: require("./i18n-EN.json"),
    },
    frFR: {
      translations: require("./i18n-FR.json"),
    },
  },
  ns: ["translations"],
  defaultNS: "translations",
});

i18n.languages = ["enGB", "frFR"];

export default i18n;
