import React from "react";
import Grid from "@mui/material/Grid";
import CharacterCard from "./CharacterCard";
import { Character } from "../interfaces/Character";

interface CharacterGridProps {
  characters: Character[];
}

const CharacterGrid: React.FC<CharacterGridProps> = ({ characters }) => {
  return (
    <Grid container spacing={3}>
      {characters.map((character, index) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
          <CharacterCard {...character} />
        </Grid>
      ))}
    </Grid>
  );
};

export default CharacterGrid;
