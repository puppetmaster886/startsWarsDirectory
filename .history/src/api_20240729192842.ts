import axios from "axios";
import { Character } from "./interfaces/Characters";

const baseUrl = "https://swapi.dev/api/";

export const fetchPeople = async () => {
  const response = await axios.get(`${baseUrl}people/`);
  return response.data;
};

export const fetchhomeworld = async (url: string) => {
  const response = await axios.get(url);
  return response.data;
};

export const fetchSpecies = async (url: string) => {
  const response = await axios.get(url);
  return response.data;
};

/**
 * Fetches all characters from the Star Wars API and maps only the name, homeworld, and species
 * @returns {Promise<Character[]>} - A promise that resolves to an array of characters
 */
export const fetchAllCharacters = async (): Promise<Character[]> => {
  const peopleData = await fetchPeople();
  const people = await Promise.all(
    peopleData.results.map(async (person: any) => {
      const homeworld = await fetchhomeworld(person.homeworld);
      const species = person.species.length
        ? await fetchSpecies(person.species[0])
        : { name: "Human" };
      return {
        name: person.name,
        homeworld: homeworld.name,
        species: species.name,
      };
    })
  );
  return people;
};
