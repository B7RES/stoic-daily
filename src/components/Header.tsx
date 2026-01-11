import { useAppContext } from "../context/AppContext";
import { Moon, Sun, Globe } from "lucide-react";
import "../styles/header.css";

export default function Header() {
  const { language, toggleLanguage, theme, toggleTheme } = useAppContext();

  return (
    <header className='header'>
      <div className='controls'>
        <button className='lang-toggle' onClick={toggleLanguage} title='Toggle language'>
          <Globe size={24} />
          <span>{language === "en" ? "EN" : "IT"}</span>
        </button>
        <button className='theme-toggle' onClick={toggleTheme} title='Toggle theme'>
          {theme === "dark" ? <Sun size={24} /> : <Moon size={24} />}
        </button>
      </div>
    </header>
  );
}
