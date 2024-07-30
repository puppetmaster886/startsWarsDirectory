import React, { useEffect, useState, useCallback, useRef } from "react";
import Container from "@mui/material/Container";
import { fetchPeople, fetchhomeworld, fetchSpecies } from "./api";
import { Character } from "./interfaces/Character";
// import SearchBar from "./components/SearchBar";
import CharacterGrid from "./components/CharacterGrid";
import CircularProgress from "@mui/material/CircularProgress";

const App: React.FC = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  // const [filteredCharacters, setFilteredCharacters] = useState<Character[]>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const peopleData = await fetchPeople(page);
      const people = await Promise.all(
        peopleData.results.map(async (person: any) => {
          const homeworld = await fetchhomeworld(person.homeworld);
          const species = person.species.length
            ? await fetchSpecies(person.species[0])
            : { name: "Human" };
          return {
            name: person.name,
            homeworld: homeworld.name,
            species: species.name,
          };
        })
      );
      setCharacters((prevCharacters) => [...prevCharacters, ...people]);
      // setFilteredCharacters((prevCharacters) => [...prevCharacters, ...people]);
      setHasMore(peopleData.next !== null);
      setLoading(false);
    };

    loadData();
  }, [page]);

  const handleSearch = useCallback(
    (query: string) => {
      const lowerQuery = query.toLowerCase();
      const results = characters.filter(
        (character) =>
          character.name.toLowerCase().includes(lowerQuery) ||
          character.homeworld.toLowerCase().includes(lowerQuery) ||
          character.species.toLowerCase().includes(lowerQuery)
      );
      // setFilteredCharacters(results);
    },
    [characters]
  );

  const lastCharacterRef = useCallback(
    (node: HTMLElement | null) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  return (
    <Container>
      {/* <SearchBar onSearch={handleSearch} /> */}
      <CharacterGrid characters={characters} />
      {loading && <CircularProgress />}
      <div ref={lastCharacterRef} />
    </Container>
  );
};

export default App;
