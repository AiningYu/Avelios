import React, { useState } from 'react';
import { Checkbox, Table } from 'antd';
import { useQuery } from '@apollo/client';
import { GET_CHARACTERS } from '../../index.tsx';
import { useNavigate } from 'react-router-dom';
import { ArrowRightOutlined } from '@ant-design/icons';

function CharacterTable() {
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [startCursor, setStartCursor] = useState<string | null>(null);
  const [endCursor, setEndCursor] = useState<string | null>(null);

  const navigate = useNavigate();

  const { loading, error, data, fetchMore } = useQuery(GET_CHARACTERS, {
    variables: { first: 10, after: startCursor },
    notifyOnNetworkStatusChange: true,
  });

  const formattedData: CharacterEdge[] = data?.allPeople?.edges || [];
  const pageInfo = data?.allPeople?.pageInfo || {
    endCursor: null,
    startCursor: null,
    hasNextPage: false,
    hasPreviousPage: false,
  };

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
          onClick={() => navigate(`/characters/`)}
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
          <button
            onClick={() => {
              fetchMore({
                variables: { before: pageInfo.startCursor, last: 10 },
                updateQuery: (prevResult, { fetchMoreResult }) => {
                  setStartCursor(fetchMoreResult?.allPeople?.pageInfo.startCursor || null);
                  setEndCursor(fetchMoreResult?.allPeople?.pageInfo.endCursor || null);
                  return fetchMoreResult ?? prevResult;
                },
              });
            }}
          >
            Previous
          </button>
        )}
        {pageInfo.hasNextPage && (
          <button
            onClick={() => {
              fetchMore({
                variables: { after: pageInfo.endCursor, first: 10 },
                updateQuery: (prevResult, { fetchMoreResult }) => {
                  setStartCursor(fetchMoreResult?.allPeople?.pageInfo.startCursor || null);
                  setEndCursor(fetchMoreResult?.allPeople?.pageInfo.endCursor || null);
                  return fetchMoreResult ?? prevResult;
                },
              });
            }}
          >
            Next
          </button>
        )}
      </div>
    </>
  );
}

export default CharacterTable;
