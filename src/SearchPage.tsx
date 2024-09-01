import { useCallback } from "react";
import SearchInput from "./SearchInput";
import styles from "./SearchPage.module.css";
import Logo from "./logo.svg?react";

export default function SearchPage() {
  const onSearch = useCallback((value: string) => {
    console.log("Search for:", value);
  }, []);

  return (
    <div className={styles.searchPage}>
      <div className={styles.searchContainer}>
        <Logo />
        <SearchInput onSearch={onSearch} />
      </div>
    </div>
  );
}
