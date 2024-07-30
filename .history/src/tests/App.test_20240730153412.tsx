import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "../App";
import { ThemeProvider } from "@mui/material";
import theme from "../theme";

test("renders Star Wars Character Directory", () => {
  render(
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  );
  const titleElement = screen.getByText(/Star Wars Character Directory/i);
  expect(titleElement).toBeInTheDocument();
});

test("search functionality works", () => {
  render(
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  );
  const searchInput = screen.getByLabelText(
    /search by name, homeworld, or species/i
  ) as HTMLInputElement;
  fireEvent.change(searchInput, { target: { value: "Luke" } });
  expect(searchInput.value).toBe("Luke");
});
