import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import Header from "../components/Header";
import quotes from "../data/quotes.json";
import { Sparkles, Share2, X, Maximize2, Heart } from "lucide-react";
import { useLikes } from "../hooks/useLikes";
import "../styles/app.scss";
import type { Quote } from "../types";

export default function Home() {
  const { i18n, t } = useTranslation();
  const translatedQuotes = i18n.t("quotes", {
    returnObjects: true,
  }) as Array<{ id: number; text: string; author: string }>;

  const [currentQuote, setCurrentQuote] = useState<Quote>(quotes[0]);
  const [zenMode, setZenMode] = useState(false);
  const { isLiked, toggleLike } = useLikes();

  const quoteText = translatedQuotes.find((q) => q.id === currentQuote.id)?.text || currentQuote.text.it;

  function getRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setCurrentQuote(quotes[randomIndex]);
  }

  function shareQuote() {
    const text = `"${quoteText}" — Marco Aurelio, Meditazioni, Libro ${currentQuote.book}, Verso ${currentQuote.number}`;
    if (navigator.share) {
      navigator.share({
        title: "Pensieri",
        text: text,
      });
    } else {
      navigator.clipboard.writeText(text);
    }
  }

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setCurrentQuote(quotes[randomIndex]);
  }, []);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setZenMode(false);
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  const liked = isLiked(currentQuote.id);

  return (
    <>
      {zenMode ? (
        <div className='zen-container'>
          <div className='zen-quote'>
            <blockquote>"{quoteText}"</blockquote>
            <div className='quote-meta'>
              — Marco Aurelio, Pensieri
              <br />
              Libro {currentQuote.book}, {currentQuote.number}
            </div>
          </div>
          <button className='zen-close' onClick={() => setZenMode(false)} title='Close (or press ESC)'>
            <X size={24} />
          </button>
        </div>
      ) : (
        <>
          <Header />
          <div className='app-container'>
            <div className='quote-section'>
              <blockquote className='normal'>"{quoteText}"</blockquote>
              <div className='quote-meta'>
                — Marco Aurelio, {t("home.meditations")}, {t("home.book")} {currentQuote.book}, {t("home.verse")} {currentQuote.number}
              </div>
            </div>

            <div className='button-group'>
              <button className='btn-primary' onClick={getRandomQuote}>
                <Sparkles size={20} />
                {t("home.randomQuote")}
              </button>

              <button
                className={`btn-secondary ${liked ? "btn-liked" : ""}`}
                onClick={() => toggleLike(currentQuote.id)}
                title={liked ? "Remove from likes" : "Add to likes"}>
                <Heart size={20} fill={liked ? "currentColor" : "none"} />
                {liked ? t("home.liked") : t("home.likeButton")}
              </button>

              <button className='btn-secondary' onClick={() => setZenMode(true)}>
                <Maximize2 size={20} />
                {t("home.zen")}
              </button>

              <button className='btn-secondary' onClick={shareQuote}>
                <Share2 size={20} />
                {t("home.share")}
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}
