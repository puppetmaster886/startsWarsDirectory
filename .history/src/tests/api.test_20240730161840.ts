import * as axios from "axios";
import { fetchPeople, fetchHomeworld, fetchSpecies } from "../api";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("API calls", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("fetchPeople works correctly", async () => {
    const data = {
      results: [
        {
          name: "Luke Skywalker",
          homeworld: "https://swapi.dev/api/planets/1/",
          species: ["https://swapi.dev/api/species/1/"],
        },
      ],
      next: null,
    };
    mockedAxios.get.mockResolvedValueOnce({ data });

    const result = await fetchPeople(1);
    expect(result).toEqual(data);
    expect(mockedAxios.get).toHaveBeenCalledWith(
      "https://swapi.dev/api/people/",
      { params: { page: 1, search: "" } }
    );
  });

  test("fetchHomeworld works correctly", async () => {
    const data = { name: "Tatooine" };
    mockedAxios.get.mockResolvedValueOnce({ data });

    const result = await fetchHomeworld("https://swapi.dev/api/planets/1/");
    expect(result).toEqual(data);
    expect(mockedAxios.get).toHaveBeenCalledWith(
      "https://swapi.dev/api/planets/1/"
    );
  });

  test("fetchSpecies works correctly", async () => {
    const data = { name: "Human" };
    mockedAxios.get.mockResolvedValueOnce({ data });

    const result = await fetchSpecies("https://swapi.dev/api/species/1/");
    expect(result).toEqual(data);
    expect(mockedAxios.get).toHaveBeenCalledWith(
      "https://swapi.dev/api/species/1/"
    );
  });
});
