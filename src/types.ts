export interface Quote {
  id: number;
  book: number;
  number: number;
  author: string;
  text: {
    en: string;
    it: string;
  };
}
