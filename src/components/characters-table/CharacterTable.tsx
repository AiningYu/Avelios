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
  const [favoritesOnly, setFavoritesOnly] = useState(false);

  const {
    loading,
    error,
    formattedData,
    loadNextPage,
    loadPreviousPage,
    pageInfo,
  } = useCharacterData(null);

  const compareStrings = (str1: string, str2: string): boolean => {
    if (!str1) return true;
    if (!str2) return false;
    return str1 === str2;
  };

  const filterData = (dataSource: CharacterEdge[]): CharacterEdge[] => {
    return dataSource.filter((character: CharacterEdge) => {
      const matchesGender = filters.gender
        ? compareStrings(character.node.gender, filters.gender)
        : true;

      const matchesEyeColor =
        filters.eyeColor && filters.eyeColor.length > 0
          ? filters.eyeColor.some((color) =>
            compareStrings(color, character.node.eyeColor),
          )
          : true;

      const matchesSpecies =
        filters.species && filters.species.length > 0
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
  };

  const [favorites, setFavorites] = useState<CharacterEdge[]>(() => {
    const favoritesString = localStorage.getItem('favorites');
    const parsedFavorites = favoritesString ? JSON.parse(favoritesString) : [];
    return parsedFavorites.filter(
      (fav: CharacterEdge) => fav.node && typeof fav.node.id !== 'undefined'
    );
  });


  const dataSource: CharacterEdge[] = useMemo(() => {
    if (favoritesOnly) {
      return filterData(favorites.filter((fav: CharacterEdge) => fav.node && fav.node.id));
    }
    return filterData(formattedData) || [];
  }, [favoritesOnly, formattedData, favorites,filters]);


  const toggleFavorite = (character: CharacterEdge) => {
    const isFavorite = favorites.some(
      (fav: CharacterEdge) => fav.node && fav.node.id === character.node?.id
    );

    let updatedFavorites;
    if (isFavorite) {
      updatedFavorites = favorites.filter(
        (fav: CharacterEdge) => fav.node && fav.node.id !== character.node?.id
      );
    } else {
      updatedFavorites = [...favorites, character];
    }

    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };


  const columns = [
    {
      title: 'Favorite',
      dataIndex: 'favorite',
      key: 'favorite',
      render: (_: any, record: CharacterEdge) => (
        <Checkbox
          checked={favorites.some((fav: CharacterEdge) => fav.node?.id === record.node?.id)}
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
      dataIndex: ['node', 'homeworld'],
      key: 'homeworld',
      render: (text: string) => text,
    },
    {
      title: 'Species',
      dataIndex: ['node', 'species'],
      key: 'species',
      render: (text: string) => text,
    },
    {
      title: 'Gender',
      dataIndex: ['node', 'gender'],
      key: 'gender',
      render: (text: string) => text ,
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
      <button onClick={() =>
        localStorage.removeItem('favorites')}
        // console.log(formattedData)}
      >
        clear
      </button>
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
