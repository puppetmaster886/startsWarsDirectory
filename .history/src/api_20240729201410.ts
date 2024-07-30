import axios from "axios";
import { memoize } from "lodash";

const baseUrl = "https://swapi.dev/api/";

export const fetchPeople = async (page: number = 1) => {
  const response = await axios.get(`${baseUrl}people/?page=${page}`);
  return response.data;
};

export const fetchhomeworld = memoize(async (url: string) => {
  const response = await axios.get(url);
  return response.data;
});

export const fetchSpecies = memoize(async (url: string) => {
  const response = await axios.get(url);
  return response.data;
});
