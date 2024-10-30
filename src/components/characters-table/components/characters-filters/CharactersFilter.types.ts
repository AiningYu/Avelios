export interface CharacterFiltersProps {
  gender: string | null;
  eyeColor: string[];
  species: string[];
  film: string | null;
}

export interface CharacterFiltersComponentProps {
  filters: CharacterFiltersProps;
  setFilters: React.Dispatch<React.SetStateAction<CharacterFiltersProps>>;
}
