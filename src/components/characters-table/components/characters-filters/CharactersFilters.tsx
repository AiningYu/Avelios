import React from 'react';
import { Select, Switch } from 'antd';

import {
  CharacterFiltersComponentProps,
  CharacterFiltersProps,
} from './CharactersFilter.types.ts';

const { Option } = Select;

const CharacterFilters: React.FC<CharacterFiltersComponentProps> = ({
  filters,
  setFilters,
  setFavoritesOnly,
  favoritesOnly,
}) => {
  const handleFilterChange = (
    value: string | string[],
    filterType: keyof CharacterFiltersProps,
  ) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      // [filterType]: value === 'no filter' ? null : value,
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
        <Option value="male">Male</Option>
        <Option value="female">Female</Option>
        <Option value="n/a">N/A</Option>
      </Select>

      <Select
        mode="multiple"
        placeholder="Select Eye Color"
        onChange={(value) => handleFilterChange(value, 'eyeColor')}
        style={{ width: 250 }}
        defaultValue={filters.eyeColor}
      >
        <Option value="no filter">No filter</Option>
        <Option value="blue">Blue</Option>
        <Option value="green">Green</Option>
        <Option value="brown">Brown</Option>
      </Select>

      <Select
        mode="multiple"
        placeholder="Select Species"
        onChange={(value) => handleFilterChange(value, 'species')}
        style={{ width: 250 }}
        defaultValue={filters.species}
      >
        <Option value="no filter">No filter</Option>
        <Option value="human">Human</Option>
        <Option value="droid">Droid</Option>
      </Select>

      <Select
        placeholder="Select Film"
        onChange={(value) => handleFilterChange(value, 'film')}
        style={{ width: 350 }}
        defaultValue={filters.film}
      >
        <Option value="no filter">No filter</Option>
        <Option value="A New Hope">A New Hope</Option>
        <Option value="The Empire Strikes Back">The Empire Strikes Back</Option>
      </Select>
    </div>
  );
};

export default CharacterFilters;
