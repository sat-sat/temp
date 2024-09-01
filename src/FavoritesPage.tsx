import { Center, Loader, Title } from "@mantine/core";
import MovieCardGrid from "./MovieCardGrid";
import useFavoriteMovies from "./useFavoriteMovies";

export default function FavoritesPage() {
  const { movies, isPending } = useFavoriteMovies();

  console.log("FavoritesPage", { movies, isPending });
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
