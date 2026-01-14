import { useAppContext } from "../context/AppContext";
import { Link, useLocation } from "react-router-dom";
import { Moon, Sun, Globe, Heart } from "lucide-react";
import { useTranslation } from "react-i18next";
import "../styles/header.css";

export default function Header() {
  const { language, toggleLanguage, theme, toggleTheme } = useAppContext();
  const { t } = useTranslation();
  const location = useLocation();

  return (
    <header className='header'>
      <div className='logo'>
        {location.pathname !== "/" && (
          <Link to='/' className='logo-link'>
            {t("header.title")}
          </Link>
        )}
      </div>
      <div className='controls'>
        <Link to='/liked' className='btn-liked-link' title={t("header.viewLiked")}>
          <Heart size={24} />
        </Link>
        <button className='lang-toggle' onClick={toggleLanguage} title={t("header.toggleLanguage")}>
          <Globe size={24} />
          <span>{language === "en" ? "EN" : "IT"}</span>
        </button>
        <button className='theme-toggle' onClick={toggleTheme} title={t("header.toggleTheme")}>
          {theme === "dark" ? <Sun size={24} /> : <Moon size={24} />}
        </button>
      </div>
    </header>
  );
}
