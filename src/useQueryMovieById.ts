import { keepPreviousData, useQuery } from "@tanstack/react-query";
import {
  Movie,
  MovieDetail,
  OmdbApiMovieDetailEntry,
  OmdbApiMovieSearchByIdResponse,
} from "./types";
import { OMDB_API_KEY, OMDB_API_URL } from "./vars";

export interface UseQueryMovieByIdParams {
  imdbId: Movie["imdbID"];
}

interface UseQueryMovieByIdResponse extends MovieDetail {
  error?: string;
}

export const fetchMovieById = ({
  imdbId,
}: Pick<UseQueryMovieByIdParams, "imdbId">) =>
  fetch(`${OMDB_API_URL}/?i=${imdbId}&apiKey=${OMDB_API_KEY}`).then((res) =>
    res.json()
  );

export function transformMovieEntry(
  entry: OmdbApiMovieDetailEntry
): MovieDetail {
  return {
    title: entry.Title,
    year: entry.Year,
    rated: entry.Rated,
    released: entry.Released,
    runtime: entry.Runtime,
    genre: entry.Genre,
    director: entry.Director,
    writer: entry.Writer,
    actors: entry.Actors,
    plot: entry.Plot,
    language: entry.Language,
    country: entry.Country,
    awards: entry.Awards,
    poster: entry.Poster,
    ratings: (entry.Ratings || []).map((rating) => ({
      source: rating.Source,
      value: rating.Value,
    })),
    metascore: entry.Metascore,
    imdbRating: entry.imdbRating,
    imdbVotes: entry.imdbVotes,
    imdbID: entry.imdbID,
    type: entry.Type,
    dvd: entry.DVD,
    boxOffice: entry.BoxOffice,
    production: entry.Production,
    website: entry.Website,
    response: entry.Response,
  };
}

export default function useQueryMovieById({ imdbId }: UseQueryMovieByIdParams) {
  return useQuery<
    OmdbApiMovieSearchByIdResponse,
    Error,
    UseQueryMovieByIdResponse
  >({
    queryKey: ["movie", imdbId],
    queryFn: () => fetchMovieById({ imdbId }),
    placeholderData: keepPreviousData,
    select: (data) => ({
      error: data.Error,
      ...transformMovieEntry(data),
    }),
  });
}
