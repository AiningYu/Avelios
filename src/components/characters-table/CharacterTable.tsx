// src/components/CharacterTable.tsx
import React, { useState } from 'react';
import { Checkbox, Table } from 'antd';
import { useNavigate } from 'react-router-dom';
import { ArrowRightOutlined } from '@ant-design/icons';
import { useCharacterData } from '../../hooks/useCharacterData';
import CharacterFilters from './components/characters-filters/CharactersFilters.tsx';
import { CharacterFiltersProps } from './components/characters-filters/CharactersFilter.types.ts';
import { CharacterEdge} from './CharacterTable.types.ts';

function CharacterTable() {
  const [filters, setFilters] = useState<CharacterFiltersProps>({
    gender: null,
    eyeColor: [],
    species: [],
    film: null,
  });

  const {
    loading,
    error,
    formattedData,
    favorites,
    toggleFavorite,
    loadNextPage,
    loadPreviousPage,
    pageInfo,
  } = useCharacterData(null);

  const navigate = useNavigate();

  const compareStrings = (str1: string, str2: string): boolean => {
    if (!str1) return true; // 如果 str1 为空，则返回 true 表示匹配
    if (!str2) return false; // 如果 str2 为空，则返回 false 表示不匹配
    return str1 === str2;
  };

  const filteredData = formattedData.filter((character: CharacterEdge) => {
    const matchesGender = filters.gender
      ? compareStrings(character.node.gender, filters.gender)
      : true;

    const matchesEyeColor = filters.eyeColor.length > 0
      ? filters.eyeColor.some(color => compareStrings(color, character.node.eyeColor))
      : true;

    const matchesSpecies = filters.species.length > 0
      ? filters.species.some(species => compareStrings(species, character.node.species?.name || ''))
      : true;

    // 判断电影是否匹配
    // const matchesFilm = filters.film
    //   ? character.node.filmConnection?.films.some(film => compareStrings(film.title, filters.film))
    //   : true;

    return matchesGender && matchesEyeColor && matchesSpecies;
  });


  const columns = [
    {
      title: 'Favorite',
      dataIndex: 'favorite',
      key: 'favorite',
      render: (_: any, record: CharacterEdge) => (
        <Checkbox
          checked={favorites.has(record.node.id)}
          onChange={() => toggleFavorite(record.node.id)}
        />
      ),
    },
    {
      title: 'Name',
      dataIndex: ['node', 'name'],
      key: 'name',
      render: (text: string) => text || '-',
    },
    {
      title: 'Height',
      dataIndex: ['node', 'height'],
      key: 'height',
      render: (text: string) => text || '-',
    },
    {
      title: 'Weight',
      dataIndex: ['node', 'mass'],
      key: 'mass',
      render: (text: string) => text || '-',
    },
    {
      title: 'Home Planet',
      dataIndex: ['node', 'homeworld', 'name'],
      key: 'homeworld',
      render: (text: string) => text || '-',
    },
    {
      title: 'Species',
      dataIndex: ['node', 'species', 'name'],
      key: 'species',
      render: (text: string) => text || '-',
    },
    {
      title: 'Gender',
      dataIndex: ['node', 'gender'],
      key: 'gender',
      render: (text: string) => text || '-',
    },
    {
      title: 'Eye Color',
      dataIndex: ['node', 'eyeColor'],
      key: 'eyeColor',
      render: (text: string) => text || '-',
    },
    {
      title: ' ',
      dataIndex: ' ',
      key: 'jump',
      render: (_: any, record: CharacterEdge) => (
        <ArrowRightOutlined
          onClick={() => navigate(`/characters/${record.node.id}`)}
          style={{ cursor: 'pointer' }}
        />
      ),
    },
  ];

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      <CharacterFilters filters={filters} setFilters={setFilters} />
      <Table
        columns={columns}
        dataSource={filteredData}
        rowKey={(record) => record.node.id}
        pagination={false}
      />
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
        {pageInfo.hasPreviousPage && (
          <button onClick={loadPreviousPage}>Previous</button>
        )}
        {pageInfo.hasNextPage && (
          <button onClick={loadNextPage}>Next</button>
        )}
      </div>
    </>
  );
}

export default CharacterTable;
