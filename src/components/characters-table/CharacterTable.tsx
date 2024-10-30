// src/components/CharacterTable.tsx
import React from 'react';
import { Checkbox, Table } from 'antd';
import { useNavigate } from 'react-router-dom';
import { ArrowRightOutlined } from '@ant-design/icons';
import { useCharacterData } from '../../hooks/useCharacterData';

function CharacterTable() {
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
      <Table
        columns={columns}
        dataSource={formattedData}
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
