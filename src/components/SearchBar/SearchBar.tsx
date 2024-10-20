import React, { memo, useState } from "react";
import { TextField, InputAdornment } from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";

interface SearchBarProps {
  searchQuery: string;
  title: string;
  onSearch: (query: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = memo(
  ({ searchQuery, onSearch, title }) => {
    const [input, setInput] = useState(searchQuery);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setInput(e.target.value);
      onSearch(e.target.value);
    };

    return (
      <TextField
        variant="outlined"
        placeholder={`Search ${title}...`}
        value={input}
        onChange={handleChange}
        fullWidth
        label={`Search ${title}`}
        aria-label={`Search ${title}`}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" />
              </InputAdornment>
            ),
          },
        }}
      />
    );
  }
);
