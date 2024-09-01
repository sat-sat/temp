import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import FavoritesPage from "./FavoritesPage";
import NavLayout from "./NavLayout";
import PageNotFound from "./PageNotFound";
import SearchPage from "./SearchPage";
import SearchResultsPage from "./SearchResultsPage";
import { theme } from "./theme";

const queryClient = new QueryClient();

export default function App() {
  return (
    <MantineProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Routes>
            <Route path="/">
              <Route index element={<Navigate to="/search" replace />} />
              <Route path="search" element={<SearchPage />} />
              <Route element={<NavLayout />}>
                <Route path="movies" element={<SearchResultsPage />} />
                <Route path="favorites" element={<FavoritesPage />} />
              </Route>
            </Route>
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Router>
      </QueryClientProvider>
    </MantineProvider>
  );
}
