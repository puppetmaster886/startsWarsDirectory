import axios from "axios";
import { memoize } from "lodash";

const baseUrl = "https://swapi.dev/api/";

export const fetchPeople = async (page: number = 1) => {
  const response = await axios.get(`${baseUrl}people/?page=${page}`);
  return response.data;
};

const fetchhomeworld = memoize(async (url: string) => {
  const response = await axios.get(url);
  return response.data;
});

const fetchSpecies = memoize(async (url: string) => {
  const response = await axios.get(url);
  return response.data;
});
