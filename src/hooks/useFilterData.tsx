import { useQuery } from '@apollo/client';
import {
  GET_ALL_PEOPLE_QUERY,
  GET_ALL_FILMS,
} from '../graphql/characterQueries';
import { AllFilmsData, AllPeopleData } from './FilterDataType.ts';

export const usePeopleFilteredData = () => {
  const { data, loading, error } =
    useQuery<AllPeopleData>(GET_ALL_PEOPLE_QUERY);

  if (loading || error) {
    return { genderOptions: [], eyeColorOptions: [], speciesOptions: [] };
  }

  const genderOptions = Array.from(
    new Set(
      data?.allPeople?.people.map((person) => person.gender).filter(Boolean),
    ),
  );
  const eyeColorOptions = Array.from(
    new Set(
      data?.allPeople?.people.map((person) => person.eyeColor).filter(Boolean),
    ),
  );
  const speciesOptions = Array.from(
    new Set(
      data?.allPeople?.people
        .map((person) => person.species?.name)
        .filter(Boolean),
    ),
  );

  return { genderOptions, eyeColorOptions, speciesOptions };
};

export const useFilmFilteredData = () => {
  const { data, loading, error } = useQuery<AllFilmsData>(GET_ALL_FILMS);

  if (loading || error) {
    return { filmOptions: [] };
  }

  const filmOptions =
    data?.allFilms?.films.map((film) => film.title).filter(Boolean) || [];

  return { filmOptions };
};
