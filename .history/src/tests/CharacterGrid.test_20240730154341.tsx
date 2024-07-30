import React from "react";
import { render } from "@testing-library/react";
import CharacterGrid from "../components/CharacterGrid";
import { ThemeProvider } from "@mui/material";
import theme from "../theme";

import { screen } from "@testing-library/react"; // Import the 'screen' object from the testing library package

const characters = [
  { name: "Luke Skywalker", homeworld: "Tatooine", species: "Human" },
  { name: "Darth Vader", homeworld: "Tatooine", species: "Human" },
];

test("renders character cards", () => {
  render(
    <ThemeProvider theme={theme}>
      <CharacterGrid characters={characters} hasMore={false} />
    </ThemeProvider>
  );
  expect(screen.getByText("Luke Skywalker")).toBeInTheDocument();
  expect(screen.getByText("Darth Vader")).toBeInTheDocument();
});
