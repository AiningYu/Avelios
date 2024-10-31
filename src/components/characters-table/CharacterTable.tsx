import React, { useMemo, useState } from 'react';
import { Checkbox, Table } from 'antd';
import { useNavigate } from 'react-router-dom';
import { ArrowRightOutlined } from '@ant-design/icons';
import { useCharacterData } from '../../hooks/useCharacterData';
import CharacterFilters from './components/characters-filters/CharactersFilters.tsx';
import { CharacterFiltersProps } from './components/characters-filters/CharactersFilter.types.ts';
import { CharacterEdge } from './CharacterTable.types.ts';

function CharacterTable() {
  const [filters, setFilters] = useState<CharacterFiltersProps>({
    gender: null,
    eyeColor: [],
    species: [],
    film: null,
  });
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState<Set<CharacterEdge>>(new Set());
  const [favoritesOnly, setFavoritesOnly] = useState(false);

  const {
    loading,
    error,
    formattedData,
    loadNextPage,
    loadPreviousPage,
    pageInfo,
  } = useCharacterData(null);

  const dataSource: CharacterEdge[] = useMemo(() => {
    if (favoritesOnly) {
      const favoritesString = localStorage.getItem('favorites');
      const favoritesArray = favoritesString ? JSON.parse(favoritesString) : [];
      return Array.isArray(favoritesArray) ? favoritesArray : [];
    }
    return formattedData || [];
  }, [favoritesOnly, formattedData]);


  const toggleFavorite = (character: CharacterEdge) => {
    setFavorites((prev) => {
      const updatedFavorites = new Set(prev);

      const isFavorite = Array.from(updatedFavorites).some(
        (fav) => fav.node.id === character.node.id
      );

      if (isFavorite) {
        updatedFavorites.delete(character);
      } else {
        updatedFavorites.add(character);
      }

      localStorage.setItem(
        'favorites',
        JSON.stringify(Array.from(updatedFavorites))
      );

      return updatedFavorites;
    });
  };

  const compareStrings = (str1: string, str2: string): boolean => {
    if (!str1) return true;
    if (!str2) return false;
    return str1 === str2;
  };

  const filterData = (dataSource:CharacterEdge[]) =>{
    dataSource.filter((character: CharacterEdge) => {
      const matchesGender = filters.gender
        ? compareStrings(character.node.gender, filters.gender)
        : true;

      const matchesEyeColor =
        filters.eyeColor.length > 0
          ? filters.eyeColor.some((color) =>
            compareStrings(color, character.node.eyeColor),
          )
          : true;

      const matchesSpecies =
        filters.species.length > 0
          ? filters.species.some((species) =>
            compareStrings(species, character.node.species?.name || ''),
          )
          : true;

      const matchesFilm = filters.film
        ? character.node.filmConnection?.films.some((film) =>
          compareStrings(filters.film || '', film.title || ''),
        )
        : true;

      return matchesGender && matchesEyeColor && matchesSpecies && matchesFilm;
    });
  }

  const columns = [
    {
      title: 'Favorite',
      dataIndex: 'favorite',
      key: 'favorite',
      render: (_: any, record: CharacterEdge) => (
        <Checkbox
          onChange={() => toggleFavorite(record)}
        />
      ),
    },
    {
      title: 'Name',
      dataIndex: ['node', 'name'],
      key: 'name',
      render: (text: string) => text ,
    },
    {
      title: 'Height',
      dataIndex: ['node', 'height'],
      key: 'height',
      render: (text: string) => text,
    },
    {
      title: 'Weight',
      dataIndex: ['node', 'mass'],
      key: 'mass',
      render: (text: string) => text ,
    },
    {
      title: 'Home Planet',
      dataIndex: ['node', 'homeworld', 'name'],
      key: 'homeworld',
      render: (text: string) => text,
    },
    {
      title: 'Species',
      dataIndex: ['node', 'species', 'name'],
      key: 'species',
      render: (text: string) => text ,
    },
    {
      title: 'Gender',
      dataIndex: ['node', 'gender'],
      key: 'gender',
      render: (text: string) => text,
    },
    {
      title: 'Eye Color',
      dataIndex: ['node', 'eyeColor'],
      key: 'eyeColor',
      render: (text: string) => text,
    },
    {
      title: ' ',
      dataIndex: ' ',
      key: 'jump',
      render: (_: any, record: CharacterEdge) => (
        <ArrowRightOutlined
          onClick={() => navigate(`/characters/${record.node.id}`)}
          style={{ cursor: 'pointer', width: '40' }}
        />
      ),
    },
  ];

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      <CharacterFilters
        filters={filters}
        setFilters={setFilters}
        setFavoritesOnly={setFavoritesOnly}
        favoritesOnly={favoritesOnly}
      />
      <Table
        columns={columns}
        dataSource={dataSource}
        rowKey={(record) => record.node.id}
        pagination={false}
      />
      <button onClick={()=>
        localStorage.removeItem('favorites')}> clear</button>
      <div>
        {pageInfo.hasPreviousPage && (
          <button onClick={loadPreviousPage}>Previous</button>
        )}
        {pageInfo.hasNextPage && <button onClick={loadNextPage}>Next</button>}
      </div>
    </>
  );
}

export default CharacterTable;
