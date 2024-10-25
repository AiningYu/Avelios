// src/components/CharacterTable.tsx
import React from 'react';
import { Table } from 'antd';
import Character from "./CharacterTable.types";


const data: Character[] = [
    {
        key: '1',
        name: 'Luke Skywalker',
        height: 172,
        weight: 77,
        home_planet: 'Tatooine',
        species: 'Human',
        gender: 'Male',
        eye_color: 'Blue',
    },
    {
        key: '2',
        name: 'Leia Organa',
        height: 150,
        weight: 49,
        home_planet: 'Alderaan',
        species: 'Human',
        gender: 'Female',
        eye_color: 'Brown',
    },
    // 其他角色数据
];

const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Height',
        dataIndex: 'height',
        key: 'height',
    },
    {
        title: 'Weight',
        dataIndex: 'weight',
        key: 'weight',
    },
    {
        title: 'Home Planet',
        dataIndex: 'home_planet',
        key: 'home_planet',
    },
    {
        title: 'Species',
        dataIndex: 'species',
        key: 'species',
    },
    {
        title: 'Gender',
        dataIndex: 'gender',
        key: 'gender',
    },
    {
        title: 'Eye Color',
        dataIndex: 'eye_color',
        key: 'eye_color',
    },
];

const CharacterTable: React.FC = () => {
    return <Table columns={columns} dataSource={data} />;
};

export default CharacterTable;
