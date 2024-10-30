import React, { useState } from 'react';
import { Checkbox, Table } from 'antd';
import { useQuery } from '@apollo/client';
import { GET_CHARACTERS } from '../../index.tsx';
import { useNavigate } from 'react-router-dom';
import { ArrowRightOutlined } from '@ant-design/icons';

function CharacterTable(props: CharacterTableProps) {
  const { page } = props;
  const pageSize = 10;
  const offset = (page - 1) * pageSize;
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const navigate = useNavigate();

  const { loading, error, data } = useQuery(GET_CHARACTERS, {
    variables: { first: pageSize, after: offset.toString() },
  });
  const formattedData: CharacterEdge[] = data?.allPeople?.edges || [];

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
          // onClick={() => navigate(`/characters/${record.node.id}`)}
          onClick={() => navigate(`/characters/`)}
          style={{ cursor: 'pointer' }}
        />
      ),
    },
  ];

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <Table
      columns={columns}
      dataSource={formattedData}
      rowKey={(record) => record.node.id}
      pagination={false}
      className="custom-table"
    />
  );

}

export default CharacterTable;
