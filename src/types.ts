export interface Movie {
  title?: string;
  year?: string;
  imdbID: string;
  type?: string;
  poster?: string;
}

export interface MovieDetail {
  title?: string;
  year?: string;
  rated?: string;
  released?: string;
  runtime?: string;
  genre?: string;
  director?: string;
  writer?: string;
  actors?: string;
  plot?: string;
  language?: string;
  country?: string;
  awards?: string;
  poster?: string;
  ratings?: Rating[];
  metascore?: string;
  imdbRating?: string;
  imdbVotes?: string;
  imdbID: string;
  type?: string;
  dvd?: string;
  boxOffice?: string;
  production?: string;
  website?: string;
  response?: string;
}

export interface Rating {
  source?: string;
  value?: string;
}

export interface OmdbApiMovieEntry {
  Title?: string;
  Year?: string;
  imdbID: string;
  Type?: string;
  Poster?: string;
}

export interface OmdbApiMovieDetailEntry {
  Title?: string;
  Year?: string;
  Rated?: string;
  Released?: string;
  Runtime?: string;
  Genre?: string;
  Director?: string;
  Writer?: string;
  Actors?: string;
  Plot?: string;
  Language?: string;
  Country?: string;
  Awards?: string;
  Poster?: string;
  Ratings?: OmdbApiMovieDetailEntryRating[];
  Metascore?: string;
  imdbRating?: string;
  imdbVotes?: string;
  imdbID: string;
  Type?: string;
  DVD?: string;
  BoxOffice?: string;
  Production?: string;
  Website?: string;
  Response?: string;
}

export interface OmdbApiMovieDetailEntryRating {
  Source?: string;
  Value?: string;
}

export interface OmdbApiMovieSearchResponse {
  Search: OmdbApiMovieEntry[];
  totalResults: string;
  Response: "True" | "False";
  Error?: string;
}

export interface OmdbApiMovieSearchByIdResponse
  extends OmdbApiMovieDetailEntry {
  Response: "True" | "False";
  Error?: string;
}
