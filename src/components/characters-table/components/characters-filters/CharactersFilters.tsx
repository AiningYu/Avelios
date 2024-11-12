import React from 'react';
import { Select, Switch } from 'antd';

import {
  CharacterFiltersComponentProps,
  CharacterFiltersProps,
} from './CharactersFilter.types.ts';
import { useFilmFilteredData, usePeopleFilteredData } from '../../../../hooks/useFilterData.tsx';

const { Option } = Select;

const CharacterFilters: React.FC<CharacterFiltersComponentProps> = ({
  filters,
  setFilters,
  setFavoritesOnly,
  favoritesOnly,
}) => {
  const { genderOptions, eyeColorOptions, speciesOptions } = usePeopleFilteredData();
  const { filmOptions } = useFilmFilteredData();

  const handleFilterChange = (
    value: string | string[],
    filterType: keyof CharacterFiltersProps,
  ) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterType]: Array.isArray(value)?  (value.includes('no filter') ? null:value) : (value === 'no filter' ? null : value),
    }));
  };

  return (
    <div style={{ marginBottom: '20px', display: 'flex', gap: '20px' }}>
      <Switch
        onChange={() => setFavoritesOnly(!favoritesOnly)}
        checked={favoritesOnly}
        checkedChildren="favorites"
        unCheckedChildren="favorites"
        style={{ width: 100 }}
      ></Switch>

      <Select
        placeholder="Select Gender"
        onChange={(value) => handleFilterChange(value, 'gender')}
        style={{ width: 150 }}
        defaultValue={filters.gender}
      >
        <Option value="no filter">No filter</Option>
        {genderOptions.map(gender => (
          <Option value={gender}>{gender}</Option>
        ))}
      </Select>

      <Select
        mode="multiple"
        placeholder="Select Eye Color"
        onChange={(value) => handleFilterChange(value, 'eyeColor')}
        style={{ width: 250 }}
        defaultValue={filters.eyeColor}
      >
        <Option value="no filter">No filter</Option>
        {eyeColorOptions.map(color => (
          <Option value={color}>{color}</Option>
        ))}
      </Select>

      <Select
        mode="multiple"
        placeholder="Select Species"
        onChange={(value) => handleFilterChange(value, 'species')}
        style={{ width: 250 }}
        defaultValue={filters.species}
      >
        <Option value="no filter">No filter</Option>
        {speciesOptions.map(species => (
          <Option value={species}>{species}</Option>
        ))}
      </Select>

      <Select
        placeholder="Select Film"
        onChange={(value) => handleFilterChange(value, 'film')}
        style={{ width: 350 }}
        defaultValue={filters.film}
      >
        <Option value="no filter">No filter</Option>
        {filmOptions.map(film => (
        <Option value={film}>{film}</Option>
      ))}
      </Select>
    </div>
  );
};

export default CharacterFilters;
