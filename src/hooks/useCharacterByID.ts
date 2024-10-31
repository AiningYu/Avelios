import { useQuery } from '@apollo/client';
import { GET_CHARACTER_BY_ID } from '../graphql/characterQueries';
import { Vehicle } from '../graphql/graphql.ts';

interface Film {
  title: string;
  releaseDate: string;
}


interface CharacterData {
  id: string;
  name: string;
  height: string;
  mass: string;
  homeworld: { name: string };
  species: { name: string };
  gender: string;
  eyeColor: string;
  skinColor: string;
  hairColor: string;
  birthYear: string;
  filmConnection: {
    films: Film[];
    totalCount: number;
  };
  vehicleConnection: {
    vehicles: Vehicle[];
  }
}

export function useCharacterById(id: string) {
  const { loading, error, data } = useQuery<{ person: CharacterData }>(GET_CHARACTER_BY_ID, {
    variables: { id },
    skip: !id,
  });

  return {
    loading,
    error,
    character: data?.person || null,
  };
}
