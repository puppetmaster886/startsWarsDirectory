import React, { useEffect, useState, useCallback, useRef } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { fetchPeople, fetchHomeworld, fetchSpecies } from "./api";
import { Character } from "./interfaces/Character";
import SearchBar from "./components/SearchBar";
import CharacterGrid from "./components/CharacterGrid";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import "./App.css";

const App: React.FC = () => {
  const [filteredCharacters, setFilteredCharacters] = useState<Character[]>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const observer = useRef<IntersectionObserver | null>(null);

  const loadData = useCallback(async (page: number, search: string = "") => {
    setLoading(true);
    const peopleData = await fetchPeople(page, search);
    const people = await Promise.all(
      peopleData.results.map(async (person: any) => {
        const homeworld = await fetchHomeworld(person.homeworld);
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
    setFilteredCharacters((prevCharacters) =>
      page === 1 ? people : [...prevCharacters, ...people]
    );
    setHasMore(peopleData.next !== null);
    setLoading(false);
  }, []);

  useEffect(() => {
    loadData(page, searchQuery);
  }, [page, loadData, searchQuery]);

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
    setPage(1);
  }, []);

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
    <Container sx={{ py: 4 }}>
      <Box my={4}>
        <Typography variant="h2" component="h1" gutterBottom align="center">
          Star Wars Character Directory
        </Typography>
        <SearchBar onSearch={handleSearch} />
      </Box>
      <CharacterGrid
        characters={filteredCharacters}
        loading={loading}
        hasMore={hasMore}
      />
      {loading && (
        <Box display="flex" justifyContent="center" my={4}>
          <CircularProgress />
        </Box>
      )}
      <div ref={lastCharacterRef} />
    </Container>
  );
};

export default App;
