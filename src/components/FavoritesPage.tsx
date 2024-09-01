import { Center, Loader, Title } from "@mantine/core";
import useFavoriteMovies from "../hooks/useFavoriteMovies";
import MovieCardGrid from "./MovieCardGrid";

export default function FavoritesPage() {
  const { movies, isPending } = useFavoriteMovies();

  return (
    <>
      <div>
        {isPending ? (
          <Center>
            <Loader />
          </Center>
        ) : (
          <>
            <Title order={3} c="white" mb="md">
              Favorites
            </Title>
            <MovieCardGrid movies={movies || []} />
          </>
        )}
      </div>
    </>
  );
}
