import React from 'react';
import { Select } from 'antd';

import { CharacterFiltersComponentProps, CharacterFiltersProps } from './CharactersFilter.types.ts';

const { Option } = Select;


  const CharacterFilters: React.FC<CharacterFiltersComponentProps> = ({ filters, setFilters }) => {
    const handleFilterChange = (value: string | string[], filterType: keyof CharacterFiltersProps) => {
      setFilters((prevFilters) => ({
        ...prevFilters,
        [filterType]: value,
      }));
    };

  return (
    <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
      <Select
        placeholder="Select Gender"
        onChange={(value) => handleFilterChange(value, 'gender')}
        style={{ width: 150 }}
      >
        <Option value="male">Male</Option>
        <Option value="female">Female</Option>
        <Option value="other">Other</Option>
      </Select>

      <Select
        mode="multiple"
        placeholder="Select Eye Color"
        onChange={(value) => handleFilterChange(value, 'eyeColor')}
        style={{ width: 200 }}
      >
        <Option value="blue">Blue</Option>
        <Option value="green">Green</Option>
        <Option value="brown">Brown</Option>
        {/* Add more options as needed */}
      </Select>

      <Select
        mode="multiple"
        placeholder="Select Species"
        onChange={(value) => handleFilterChange(value, 'species')}
        style={{ width: 200 }}
      >
        <Option value="human">Human</Option>
        <Option value="droid">Droid</Option>
        {/* Add more options as needed */}
      </Select>

      <Select
        placeholder="Select Film"
        onChange={(value) => handleFilterChange(value, 'film')}
        style={{ width: 200 }}
      >
        <Option value="A New Hope">A New Hope</Option>
        <Option value="The Empire Strikes Back">The Empire Strikes Back</Option>
        {/* Add more options as needed */}
      </Select>
    </div>
  );
};

export default CharacterFilters;
