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
    notifyOnNetworkStatusChange: true
  });

  const formattedData = data?.allPeople?.edges.map((edge: CharacterEdge) => ({
    cursor: edge.cursor,
    node: formatCharacterData(edge.node),
  })) || [];


  const handleNext = async () => {
    await fetchMore({
      variables: { cursor: data.allPeople.pageInfo.endCursor },
      updateQuery: (prevResult, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prevResult;
        return fetchMoreResult;
      },
    });
  };

  const handlePrevious = async () => {
    await fetchMore({
      variables: { cursor: data.allPeople.pageInfo.startCursor },
      updateQuery: (prevResult, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prevResult;
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
