import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import quotes from "../data/quotes.json";
import { ArrowLeft, Heart } from "lucide-react";
import { useLikes } from "../hooks/useLikes";
import "../styles/liked.scss";
import type { Quote } from "../types";

export default function LikedQuotes() {
  const { i18n, t } = useTranslation();
  const translatedQuotes = i18n.t("quotes", {
    returnObjects: true,
  }) as Array<{ id: number; text: string; author: string }>;

  const { likes, removeLike } = useLikes();

  const likedQuotesData: (Quote & { likedAt: string })[] = likes
    .map((like) => {
      const quote = quotes.find((q) => q.id === like.quoteId);
      return quote ? { ...quote, likedAt: like.likedAt } : null;
    })
    .filter((q): q is Quote & { likedAt: string } => q !== null)
    .sort((a, b) => new Date(b.likedAt).getTime() - new Date(a.likedAt).getTime());

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("it-IT", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <>
      <Header />
      <div className='liked-container'>
        <Link to='/' className='back-link'>
          <ArrowLeft size={20} />
          {t("likedQuotes.backHome")}
        </Link>

        <h1>{t("likedQuotes.title")}</h1>

        {likedQuotesData.length === 0 ? (
          <div className='empty-state'>
            <Heart size={48} />
            <p>{t("likedQuotes.emptyMessage")}</p>
          </div>
        ) : (
          <div className='liked-list'>
            {likedQuotesData.map((quote) => {
              const translatedText = translatedQuotes.find((q) => q.id === quote.id)?.text || quote.text.it;

              return (
                <div key={quote.id} className='liked-item'>
                  <div className='liked-item-content'>
                    <blockquote>"{translatedText}"</blockquote>
                    <div className='liked-item-meta'>
                      <p>
                        — Marco Aurelio, {t("home.meditations")}, {t("home.book")} {quote.book}, {t("home.verse")} {quote.number}
                      </p>
                      <p className='liked-date'>
                        <Heart size={14} fill='currentColor' />
                        {t("likedQuotes.likedSince")} {formatDate(quote.likedAt)}
                      </p>
                    </div>
                  </div>
                  <button className='btn-remove-like' onClick={() => removeLike(quote.id)} title='Remove from likes'>
                    <Heart size={20} fill='currentColor' />
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}
