import { useState, useEffect } from "react";

export interface LikeData {
  quoteId: number;
  likedAt: string;
}

const LIKES_KEY = "stoic-daily-likes";

export function useLikes() {
  const [likes, setLikes] = useState<LikeData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem(LIKES_KEY);
    if (stored) {
      try {
        setLikes(JSON.parse(stored));
      } catch (e) {
        console.error("Error parsing likes from localStorage:", e);
      }
    }
    setIsLoading(false);
  }, []);

  function saveLikes(newLikes: LikeData[]) {
    setLikes(newLikes);
    localStorage.setItem(LIKES_KEY, JSON.stringify(newLikes));
  }

  function addLike(quoteId: number) {
    if (!isLiked(quoteId)) {
      const newLikes = [...likes, { quoteId, likedAt: new Date().toISOString() }];
      saveLikes(newLikes);
    }
  }

  function removeLike(quoteId: number) {
    const newLikes = likes.filter((like) => like.quoteId !== quoteId);
    saveLikes(newLikes);
  }

  function isLiked(quoteId: number): boolean {
    return likes.some((like) => like.quoteId === quoteId);
  }

  function toggleLike(quoteId: number) {
    if (isLiked(quoteId)) {
      removeLike(quoteId);
    } else {
      addLike(quoteId);
    }
  }

  return {
    likes,
    addLike,
    removeLike,
    isLiked,
    toggleLike,
    isLoading,
  };
}
