export interface MediumArticle {
  title: string;
  link: string;
  pubDate: string;
  thumbnail: string;
  snippet: string;
  categories: string[];
  readingTime: number;
}

export interface AnchorBrief {
  briefing: string;
  signals: { url: string; signal: string }[];
  topics: string[];
}
