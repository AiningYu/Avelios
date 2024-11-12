import React from 'react';

export interface CharacterFiltersProps {
  gender: string | null;
  eyeColor: string[];
  species: string[];
  film: string | null;
}

export interface CharacterFiltersComponentProps {
  filters: CharacterFiltersProps;
  setFilters: React.Dispatch<React.SetStateAction<CharacterFiltersProps>>;
  setFavoritesOnly: React.Dispatch<React.SetStateAction<boolean>>;
  favoritesOnly: boolean;
}


