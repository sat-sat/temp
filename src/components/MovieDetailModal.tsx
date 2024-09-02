import {
  Alert,
  Badge,
  Button,
  Center,
  Group,
  Loader,
  Modal,
  Rating,
  Stack,
  Text,
  Title,
  rem,
} from "@mantine/core";
import {
  IconExclamationCircleFilled,
  IconStarFilled,
} from "@tabler/icons-react";
import { Dispatch, SetStateAction } from "react";
import useFavoriteMovie from "../hooks/useFavoriteMovie";
import useQueryMovieById from "../hooks/useQueryMovieById";
import { Movie, MovieDetail } from "../types";
import styles from "./MovieDetailModal.module.css";

const LINEAR_GRADIENT = `linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.3) 0%,
    rgba(0, 0, 0, 0.95) 100%
  )`;

interface MovieDetailModalProps {
  movieId: Movie["imdbID"];
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

function FavoriteButton({ movieId }: { movieId: Movie["imdbID"] }) {
  const { isFavorite, toggleFavorite } = useFavoriteMovie(movieId || "");

  return (
    <Button
      c={isFavorite ? "orange" : "white"}
      color={isFavorite ? "orange" : "white"}
      variant="outline"
      leftSection={
        <IconStarFilled style={{ width: rem(16), height: rem(16) }} />
      }
      onClick={toggleFavorite}
    >
      {isFavorite ? "Remove from" : "Add to"} favorites
    </Button>
  );
}

function ModalContent({ movie }: { movie: MovieDetail }) {
  return (
    <div
      className={styles.modalContent}
      style={{
        backgroundImage: `${LINEAR_GRADIENT}, url('${movie.poster}')`,
      }}
    >
      <Stack gap="sm">
        {movie.title && (
          <Title c="white" order={1}>
            {movie.title}
          </Title>
        )}
        {movie.plot && (
          <Text lineClamp={5} c="#FAFAFA">
            {movie.plot}
          </Text>
        )}
        <Group mb="xl">
          {movie.imdbRating && (
            <Rating value={parseFloat(movie.imdbRating) / 2} fractions={10} />
          )}
          {movie.runtime && <Text>{movie.runtime}</Text>}
          {movie.rated && (
            <Badge variant="outline" color="white" radius="sm">
              {movie.rated}
            </Badge>
          )}
        </Group>
      </Stack>
      <Group mb="xl">
        <Button color="orange">Start watching</Button>
        <FavoriteButton movieId={movie.imdbID || ""} />
      </Group>
      <Stack gap={0}>
        {movie.actors && (
          <Text c="white">
            <strong>Cast: </strong>
            {movie.actors}
          </Text>
        )}
        {movie.genre && (
          <Text c="white">
            <strong>Genre: </strong>
            {movie.genre}
          </Text>
        )}
      </Stack>
    </div>
  );
}

export default function MovieDetailModal({
  movieId,
  isOpen,
  setIsOpen,
}: MovieDetailModalProps) {
  const { isPending, isError, error, data } = useQueryMovieById({
    imdbId: movieId,
  });

  return (
    <Modal.Root
      opened={isOpen}
      onClose={() => setIsOpen(false)}
      centered
      size="90%"
    >
      <Modal.Overlay />

      <Modal.Content radius="lg">
        {isPending ? (
          <Center h="50vh">
            <Loader />
          </Center>
        ) : isError ? (
          <Alert
            variant="light"
            color="red"
            title="Search Error"
            icon={<IconExclamationCircleFilled />}
          >
            {error?.message}
          </Alert>
        ) : (
          <ModalContent movie={data} />
        )}
      </Modal.Content>
    </Modal.Root>
  );
}
