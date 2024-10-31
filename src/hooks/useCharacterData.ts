import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_CHARACTERS } from '../graphql/characterQueries';
import { CharacterEdge, CharacterNode } from '../components/characters-table/CharacterTable.types.ts';

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

export function useCharacterData(startCursor: string | null) {
  const [startCursorState, setStartCursor] = useState<string | null>(startCursor);
  const [endCursor, setEndCursor] = useState<string | null>(null);

  const { loading, error, data, fetchMore } = useQuery(GET_CHARACTERS, {
    variables: { first: 10, after: startCursorState },
    notifyOnNetworkStatusChange: true,
  });

  const pageInfo = data?.allPeople?.pageInfo || {
    endCursor: null,
    startCursor: null,
    hasNextPage: false,
    hasPreviousPage: false,
  };

  const formattedData = data?.allPeople?.edges.map((edge:CharacterEdge)=> ({
    cursor: edge.cursor,
    node: formatCharacterData(edge.node),
  })) || [];

  const loadNextPage = async () => {
    await fetchMore({
      variables: { after: pageInfo.endCursor, first: 10 },
      updateQuery: (prevResult, { fetchMoreResult }) => {
        setStartCursor(fetchMoreResult?.allPeople?.pageInfo.startCursor || null);
        setEndCursor(fetchMoreResult?.allPeople?.pageInfo.endCursor || null);
        return fetchMoreResult ?? prevResult;
      },
    });
  };

  const loadPreviousPage = async () => {
    await fetchMore({
      variables: { before: pageInfo.startCursor, last: 10 },
      updateQuery: (prevResult, { fetchMoreResult }) => {
        setStartCursor(fetchMoreResult?.allPeople?.pageInfo.startCursor || null);
        setEndCursor(fetchMoreResult?.allPeople?.pageInfo.endCursor || null);
        return fetchMoreResult ?? prevResult;
      },
    });
  };

  return {
    loading,
    error,
    formattedData,
    loadNextPage,
    loadPreviousPage,
    pageInfo,
  };
}
