import { useTranslation } from "react-i18next";

export function useLanguage() {
  const { i18n } = useTranslation();
  const language = (i18n.language as "it" | "en") || "it";

  const toggleLanguage = () => {
    const newLang = language === "en" ? "it" : "en";
    i18n.changeLanguage(newLang);
    localStorage.setItem("language", newLang);
  };

  return { language, toggleLanguage };
}
