import { Button, MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useAppStore } from "./store";
import { theme } from "./theme";

const queryClient = new QueryClient();

export default function App() {
  const counter = useAppStore((store) => store.counter);
  const setCounter = useAppStore((store) => store.setCounter);

  return (
    <MantineProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <p>Counter: {counter}</p>
        <Button onClick={() => setCounter(counter + 1)}>
          Increment Counter
        </Button>
      </QueryClientProvider>
    </MantineProvider>
  );
}
