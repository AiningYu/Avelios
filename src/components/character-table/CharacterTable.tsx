// src/components/CharacterTable.tsx

import React from 'react';
import { Table } from 'antd';
import { useQuery} from '@apollo/client';
import {GET_CHARACTERS} from '../../index.tsx';

const columns = [
    {
        title: 'Name',
        dataIndex: ['node', 'name'],
        key: 'name',
    },
    {
        title: 'Height',
        dataIndex: ['node', 'height'],
        key: 'height',
    },
    {
        title: 'Weight',
        dataIndex: ['node', 'mass'],
        key: 'mass',
    },
    {
        title: 'Home Planet',
        dataIndex: ['node', 'homeworld', 'name'],
        key: 'homeworld',
    },
    {
        title: 'Species',
        dataIndex: ['node', 'species', 'name'],
        key: 'species',
    },
    {
        title: 'Gender',
        dataIndex: ['node', 'gender'],
        key: 'gender',
    },
    {
        title: 'Eye Color',
        dataIndex: ['node', 'eyeColor'],
        key: 'eyeColor',
    },
];

const CharacterTable: React.FC = () => {
    const { loading, error, data } = useQuery(GET_CHARACTERS, {
        variables: { first: 10 },
    });
    console.log("data");

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const formattedData: CharacterEdge[] = data?.allPeople?.edges || [];

    return <Table columns={columns} dataSource={formattedData} rowKey={(record) => record.node.id} pagination={false} />;
};

export default CharacterTable;
