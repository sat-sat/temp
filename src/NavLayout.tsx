import { Tabs } from "@mantine/core";
import { useCallback } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import styles from "./NavLayout.module.css";
import SearchInput from "./SearchInput";
import Logo from "./logo.svg?react";

function TabsList() {
  const navigate = useNavigate();

  return (
    <Tabs
      color="white"
      variant="pills"
      value={location.pathname === "/favorites" ? "favorites" : "search"}
      classNames={styles}
      onChange={(value) => navigate(`/${value}`)}
    >
      <Tabs.List>
        <Tabs.Tab color="blue" value="search">
          Movies
        </Tabs.Tab>
        <Tabs.Tab value="favorites">Favorites</Tabs.Tab>
      </Tabs.List>
    </Tabs>
  );
}

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
          <TabsList />
          <SearchInput onSearch={onSearch} />
        </div>
      </nav>
      <article>
        <Outlet />
      </article>
    </main>
  );
}
