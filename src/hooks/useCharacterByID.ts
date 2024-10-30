import { useQuery } from '@apollo/client';
import { GET_CHARACTER_BY_ID } from '../graphql/characterQueries';

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
  filmConnection: {
    films: Film[];
    totalCount: number;
  };
}

export function useCharacterById(id: string) {
  const { loading, error, data } = useQuery<{ person: CharacterData }>(GET_CHARACTER_BY_ID, {
    variables: { id },
    skip: !id, // Skip query if no ID is provided
  });

  return {
    loading,
    error,
    character: data?.person || null,
  };
}
