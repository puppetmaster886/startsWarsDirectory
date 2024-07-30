import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Character } from "../interfaces/Character";
import CardHeader from "@mui/material/CardHeader";

/**
 * CharacterCard component
 * This component displays the character's name, homeworld, and species.
 * @param param0  Character object
 * @param name  Character's name
 * @param homeworld  Character's homeworld
 * @param species  Character's species
 */
const CharacterCard: React.FC<Character> = ({ name, homeworld, species }) => {
  return (
    <Card>
      <CardHeader title={name} titleTypographyProps={{ variant: "h6" }} />
      <CardContent>
        <Typography color="text.secondary">
          <b>Homeworld:</b> {homeworld}
        </Typography>
        <Typography color="text.secondary">
          <b>Species:</b> {species}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default React.memo(CharacterCard);
