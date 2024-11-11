import { useQuery } from '@apollo/client';
import { GET_CHARACTERS } from '../graphql/characterQueries';
import { CharacterEdge, CharacterNode } from '../components/characters-table/CharacterTable.types';

function formatCharacterData(character: CharacterNode) {
  return {
    id: character.id || '-',
    name: character.name || '-',
    height: character.height || '-',
    mass: character.mass || '-',
    homeworld: character.homeworld?.name || '-',
    species: character.species?.name || '-',
    gender: character.gender || '-',
    eyeColor: character.eyeColor || '-',
    films: character.filmConnection?.films.map(film => ({
      title: film.title || '-',
      releaseDate: film.releaseDate || '-'
    })) || [],
    totalCount: character.filmConnection?.totalCount || '-'
  };
}

const useCharacterTable = () => {

  const { data, loading, error, fetchMore} = useQuery(GET_CHARACTERS, {
    variables: { first: 10, after: null },
    notifyOnNetworkStatusChange: true
  });

  const formattedData = data?.allPeople?.edges.map((edge: CharacterEdge) => ({
    cursor: edge.cursor,
    node: formatCharacterData(edge.node),
  })) || [];


  const handleNext = async () => {
    await fetchMore({
      variables: { first: 10, after: data.allPeople.pageInfo.endCursor, last: null, before: null},
      updateQuery: (previousResult, { fetchMoreResult }) => {
        if (!fetchMoreResult) return previousResult;
        return fetchMoreResult;
      },
    });
  };

  const handlePrevious = async () => {
    await fetchMore({
      variables: { last: 10, before: data.allPeople.pageInfo.startCursor, first: null, after: null },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        if (!fetchMoreResult) return previousResult;
        return fetchMoreResult;
      },
    });

  };

  return {
    data,
    loading,
    error,
    handleNext,
    handlePrevious,
    formattedData,
  };
};

export default useCharacterTable;
