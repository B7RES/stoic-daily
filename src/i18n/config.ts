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
      home: {
        randomQuote: "Frase casuale",
        liked: "Liked",
        likeButton: "Mi piace",
        zen: "Zen",
        share: "Condividi",
        meditations: "Meditazioni",
        book: "Libro",
        verse: "Verso",
      },
      header: {
        title: "Pensieri",
        viewLiked: "View liked quotes",
        toggleLanguage: "Toggle language",
        toggleTheme: "Toggle theme",
      },
      likedQuotes: {
        backHome: "Torna alla home",
        title: "Quote che ti piacciono",
        emptyMessage: "Non hai ancora messo like a nessuna frase.",
        discoverQuotes: "Scopri le frasi",
        likedSince: "Mi piace dal",
      },
    },
  },
  en: {
    translation: {
      quotes: quotes.map((q) => ({
        id: q.id,
        text: q.text.en,
        author: q.author,
      })),
      home: {
        randomQuote: "Random Quote",
        liked: "Liked",
        likeButton: "Like",
        zen: "Zen",
        share: "Share",
        meditations: "Meditations",
        book: "Book",
        verse: "Verse",
      },
      header: {
        title: "Thoughts",
        viewLiked: "View liked quotes",
        toggleLanguage: "Toggle language",
        toggleTheme: "Toggle theme",
      },
      likedQuotes: {
        backHome: "Back to home",
        title: "Your Liked Quotes",
        emptyMessage: "You haven't liked any quotes yet.",
        discoverQuotes: "Discover quotes",
        likedSince: "Liked since",
      },
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
