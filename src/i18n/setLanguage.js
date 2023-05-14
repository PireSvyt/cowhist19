import { useTranslation } from "react-i18next";

function setLanguage(language) {
  const { i18n } = useTranslation();
  language = language.replace(/-[a-zA-Z]{2}/, "");
  i18n.changeLanguage(language);
}

export default setLanguage;
