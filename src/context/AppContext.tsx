import { createContext, useContext } from "react";
import type { ReactNode } from "react";
import { useTheme } from "../hooks/useTheme";
import { useLanguage } from "../hooks/useLanguage";

interface AppContextType {
  theme: "light" | "dark";
  toggleTheme: () => void;
  language: "it" | "en";
  toggleLanguage: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const { theme, toggleTheme } = useTheme();
  const { language, toggleLanguage } = useLanguage();

  const value: AppContextType = {
    theme,
    toggleTheme,
    language,
    toggleLanguage,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within AppProvider");
  }
  return context;
}
