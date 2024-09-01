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
import styles from "./MovieDetailModal.module.css";
import { Movie, MovieDetail } from "./types";
import useQueryMovieById from "./useQueryMovieById";

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
        <Button
          c="white"
          color="white"
          variant="outline"
          leftSection={
            <IconStarFilled style={{ width: rem(16), height: rem(16) }} />
          }
        >
          Add to favorites
        </Button>
      </Group>
      <Stack gap={0}>
        {movie.actors && (
          <Text c="white">
            <strong>Cast:</strong>
            {movie.actors}
          </Text>
        )}
        {movie.genre && (
          <Text c="white">
            <strong>Genre:</strong>
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
          <Center>
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
