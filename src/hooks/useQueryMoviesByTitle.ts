import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { Movie, OmdbApiMovieEntry, OmdbApiMovieSearchResponse } from "../types";
import { OMDB_API_KEY, OMDB_API_URL } from "../vars";

export interface UseQueryMoviesByTitleParams {
  title: string;
  page: number;
}

interface UseQueryMoviesResponse {
  error?: string;
  movies: Movie[];
  totalResults: number;
}

const fetchMoviesByTitle = ({
  title,
  page,
}: Pick<UseQueryMoviesByTitleParams, "title" | "page">) =>
  fetch(
    `${OMDB_API_URL}/?s=${title}&page=${page + 1}&apiKey=${OMDB_API_KEY}`
  ).then((res) => res.json());

export function transformMovieEntry(entry: OmdbApiMovieEntry): Movie {
  return {
    title: entry.Title,
    year: entry.Year,
    imdbID: entry.imdbID,
    type: entry.Type,
    poster: entry.Poster,
  };
}

export default function useQueryMoviesByTitle({
  title,
  page,
}: UseQueryMoviesByTitleParams) {
  return useQuery<OmdbApiMovieSearchResponse, Error, UseQueryMoviesResponse>({
    queryKey: ["movies", { title, page }],
    queryFn: () => fetchMoviesByTitle({ title, page }),
    placeholderData: keepPreviousData,
    select: (data) => ({
      error: data.Error,
      movies: (data.Search || []).map(transformMovieEntry),
      totalResults: parseInt(data.totalResults) || 0,
    }),
    retry: false,
  });
}
