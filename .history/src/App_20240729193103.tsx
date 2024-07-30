import React, { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import { fetchAllCharacters } from "./api";
import { Character } from "./interfaces/Character";
// import SearchBar from "./components/SearchBar";
import CharacterGrid from "./components/CharacterGrid";

const App: React.FC = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [filteredCharacters, setFilteredCharacters] = useState<Character[]>([]);

  useEffect(() => {
    const getData = async () => {
      const data = await fetchAllCharacters();
      setCharacters(data);
      setFilteredCharacters(data);
    };
    getData();
  }, []);

  const handleSearch = (query: string) => {
    const lowerQuery = query.toLowerCase();
    const results = characters.filter(
      (character) =>
        character.name.toLowerCase().includes(lowerQuery) ||
        character.homeworld.toLowerCase().includes(lowerQuery) ||
        character.species.toLowerCase().includes(lowerQuery)
    );
    setFilteredCharacters(results);
  };

  return (
    <Container>
      {/* <SearchBar onSearch={handleSearch} /> */}
      <CharacterGrid characters={filteredCharacters} />
    </Container>
  );
};

export default App;
