import React from "react";
import TextField from "@mui/material/TextField";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  return (
    <TextField
      label="Search by name, homeworld, or species..."
      variant="outlined"
      fullWidth
      onChange={(e) => onSearch(e.target.value)}
      style={{ marginBottom: "20px" }}
    />
  );
};

export default SearchBar;
