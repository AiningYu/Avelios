import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_CHARACTERS } from '../index.tsx';

export function useCharacterData(startCursor: string | null) {
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
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

  const formattedData = data?.allPeople?.edges || [];

  const toggleFavorite = (characterId: string) => {
    setFavorites((prev) => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(characterId)) {
        newFavorites.delete(characterId);
      } else {
        newFavorites.add(characterId);
      }
      return newFavorites;
    });
  };

  const loadNextPage = () => {
    fetchMore({
      variables: { after: pageInfo.endCursor, first: 10 },
      updateQuery: (prevResult, { fetchMoreResult }) => {
        setStartCursor(fetchMoreResult?.allPeople?.pageInfo.startCursor || null);
        setEndCursor(fetchMoreResult?.allPeople?.pageInfo.endCursor || null);
        return fetchMoreResult ?? prevResult;
      },
    });
  };

  const loadPreviousPage = () => {
    fetchMore({
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
    favorites,
    toggleFavorite,
    loadNextPage,
    loadPreviousPage,
    pageInfo,
  };
}
