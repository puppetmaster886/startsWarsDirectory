import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Character } from "../interfaces/Character";

const CharacterCard: React.FC<Character> = ({ name, homeworld, species }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="div">
          {name}
        </Typography>
        <Typography color="text.secondary">homeworld: {homeworld}</Typography>
        <Typography color="text.secondary">Species: {species}</Typography>
      </CardContent>
    </Card>
  );
};

export default CharacterCard;
