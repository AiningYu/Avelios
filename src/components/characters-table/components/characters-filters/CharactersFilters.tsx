import React, { useState } from 'react';
import { Button, Select, Switch } from 'antd';

import {
  CharacterFiltersComponentProps,
  CharacterFiltersProps,
} from './CharactersFilter.types.ts';

const { Option } = Select;

const CharacterFilters: React.FC<CharacterFiltersComponentProps> = ({
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
      [filterType]: value,
    }));
  };

  const resetFilters = () => {
    setFilters({
      gender: null,
      eyeColor: [],
      species: [],
      film: null,
    });
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
      >
        <Option value="male">male</Option>
        <Option value="female">female</Option>
        <Option value="n/a">n/a</Option>
      </Select>

      <Select
        mode="multiple"
        placeholder="Select Eye Color"
        onChange={(value) => handleFilterChange(value, 'eyeColor')}
        style={{ width: 250 }}
      >
        <Option value="blue">blue</Option>
        <Option value="green">green</Option>
        <Option value="brown">brown</Option>
      </Select>

      <Select
        mode="multiple"
        placeholder="Select Species"
        onChange={(value) => handleFilterChange(value, 'species')}
        style={{ width: 250 }}
      >
        <Option value="human">human</Option>
        <Option value="droid">droid</Option>
      </Select>

      <Select
        placeholder="Select Film"
        onChange={(value) => handleFilterChange(value, 'film')}
        style={{ width: 350 }}
      >
        <Option value="A New Hope">A New Hope</Option>
        <Option value="The Empire Strikes Back">The Empire Strikes Back</Option>
      </Select>

      <Button
        onClick={resetFilters}
        type="primary"
        style={{ marginLeft: '20px' }}
      >
        Reset
      </Button>
    </div>
  );
};

export default CharacterFilters;
