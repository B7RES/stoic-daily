import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import quotes from "../data/quotes.json";

const savedLanguage = localStorage.getItem("language") || "it";

const resources = {
  it: {
    translation: {
      quotes: quotes.map((q) => ({
        id: q.id,
        text: q.text.it,
        author: q.author,
      })),
    },
  },
  en: {
    translation: {
      quotes: quotes.map((q) => ({
        id: q.id,
        text: q.text.en,
        author: q.author,
      })),
    },
  },
};

i18n.use(initReactI18next).init({
  lng: savedLanguage,
  fallbackLng: "it",
  resources,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
