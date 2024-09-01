import { Input, rem } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { useCallback, useState } from "react";
import styles from "./SearchInput.module.css";

export interface SearchInputProps {
  onSearch: (value: string) => void;
}

export default function SearchInput({ onSearch }: SearchInputProps) {
  const [value, setValue] = useState<string>("");

  const onChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.currentTarget.value);
  }, []);

  const onFormSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      if (value.length) {
        onSearch(value);
      }

      // Design shows input isn't cleared after search, but adding this because it feels more natural
      setValue("");
    },
    [value]
  );

  return (
    <form name="search-form" onSubmit={onFormSubmit}>
      <Input
        classNames={{ input: styles.searchInput }}
        placeholder="Search"
        leftSection={
          <IconSearch
            style={{ width: rem(16), height: rem(16) }}
            stroke={1.5}
          />
        }
        value={value}
        onChange={onChange}
      />
    </form>
  );
}
