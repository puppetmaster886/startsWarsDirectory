import axios from "axios";

const baseUrl = "https://swapi.dev/api/";

export const fetchPeople = async () => {
  const response = await axios.get(`${baseUrl}people/`);
  return response.data.results.map((character: any) => ({
    name: character.name,
    homeworld: character.homeworld,
    species: character.species,
  }));
};
