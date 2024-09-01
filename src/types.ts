export interface Movie {
  title: string;
  year: string;
  imdbID: string;
  type: string;
  poster: string;
}

export interface OmdbApiMovieEntry {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

export interface OmdbApiMovieSearchResponse {
  Search: OmdbApiMovieEntry[];
  totalResults: string;
  Response: "True" | "False";
  Error?: string;
}
