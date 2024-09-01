import { Tabs } from "@mantine/core";
import { useCallback } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import styles from "./NavLayout.module.css";
import SearchInput from "./SearchInput";
import Logo from "./logo.svg?react";

export default function NavLayout() {
  const navigate = useNavigate();

  const onSearch = useCallback((value: string) => {
    navigate("/movies", { state: { search: value } });
  }, []);

  return (
    <main>
      <nav>
        <Logo />
        <div className={styles.navContentRight}>
          <Tabs
            color="white"
            variant="pills"
            defaultValue="movies"
            classNames={styles}
          >
            <Tabs.List defaultValue="movies">
              <Tabs.Tab color="blue" value="movies">
                Movies
              </Tabs.Tab>
              <Tabs.Tab value="favorites">Favorites</Tabs.Tab>
            </Tabs.List>
          </Tabs>
          <SearchInput onSearch={onSearch} />
        </div>
      </nav>
      <article>
        <Outlet />
      </article>
    </main>
  );
}
