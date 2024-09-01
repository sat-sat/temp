import styles from "./SearchPage.module.css";
import Logo from "./logo.svg?react";

export default function SearchPage() {
  return (
    <div className={styles.searchPage}>
      <div className={styles.searchContainer}>
        <Logo />
        Search Box
      </div>
    </div>
  );
}
