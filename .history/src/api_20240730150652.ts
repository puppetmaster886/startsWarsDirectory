import axios from "axios";
import { memoize } from "lodash";

const baseUrl = "https://swapi.dev/api/";

export const fetchPeople = memoize(
  async (page: number = 1, search: string = "") => {
    const response = await axios.get(`${baseUrl}people/`, {
      params: {
        page,
        search,
      },
    });
    return response.data;
  }
);

export const fetchHomeworld = memoize(async (url: string) => {
  const response = await axios.get(url);
  return response.data;
});

export const fetchSpecies = memoize(async (url: string) => {
  const response = await axios.get(url);
  return response.data;
});
