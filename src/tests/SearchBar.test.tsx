import React from "react";
import { render, fireEvent } from "@testing-library/react";
import SearchBar from "../components/SearchBar";
import { ThemeProvider } from "@mui/material";
import theme from "../theme";

import { screen } from "@testing-library/react";

test("renders search bar", () => {
  render(
    <ThemeProvider theme={theme}>
      <SearchBar onSearch={() => {}} />
    </ThemeProvider>
  );
  expect(
    screen.getByLabelText(/search by name, homeworld, or species/i)
  ).toBeInTheDocument();
});

test("search input works", () => {
  const onSearch = jest.fn();
  render(
    <ThemeProvider theme={theme}>
      <SearchBar onSearch={onSearch} />
    </ThemeProvider>
  );
  const input = screen.getByLabelText(/search by name, homeworld, or species/i);
  fireEvent.change(input, { target: { value: "Luke" } });
  expect(input).toHaveValue("Luke");
  expect(onSearch).toHaveBeenCalledWith("Luke");
});
