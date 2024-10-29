// src/components/CharacterTable.tsx

import React from 'react';
import {Table} from 'antd';
import { useQuery} from '@apollo/client';
import {GET_CHARACTERS} from '../../index.tsx';

const columns = [
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
];


const CharacterTable: React.FC<CharacterTableProps> = ({ page }) => {
    const pageSize = 10;
    const offset = (page - 1) * pageSize;

    const { loading, error, data } = useQuery(GET_CHARACTERS, {
        variables: { first: pageSize, after: offset.toString() }, // Adjust variables as needed
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const formattedData: CharacterEdge[] = data?.allPeople?.edges || [];

    return <Table columns={columns} dataSource={formattedData} rowKey={(record) => record.node.id} pagination={false} />;
};

export default CharacterTable;
