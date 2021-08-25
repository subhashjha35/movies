export interface MovieCompact {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

export interface SearchResult {
  Search: MovieCompact[];
  totalResults: string;
  Response: string;
}
