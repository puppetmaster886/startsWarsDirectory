import React from "react";
import { render } from "@testing-library/react";
import CharacterGrid from "../components/CharacterGrid";
import { ThemeProvider } from "@mui/material";
import theme from "../theme";

const characters = [
  { name: "Luke Skywalker", homeworld: "Tatooine", species: "Human" },
  { name: "Darth Vader", homeworld: "Tatooine", species: "Human" },
];

test("renders character cards", () => {
  const { getByText } = render(
    <ThemeProvider theme={theme}>
      <CharacterGrid characters={characters} hasMore={false} />
    </ThemeProvider>
  );
  expect(getByText("Luke Skywalker")).toBeInTheDocument();
  expect(getByText("Darth Vader")).toBeInTheDocument();
});
