import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../logo.svg?react";
import SearchInput from "./SearchInput";
import styles from "./SearchPage.module.css";

export default function SearchPage() {
  const navigate = useNavigate();

  const onSearch = useCallback((value: string) => {
    navigate("/movies", { state: { search: value } });
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
