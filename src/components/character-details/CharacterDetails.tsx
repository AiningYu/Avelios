import React from 'react';
import { useParams } from 'react-router-dom';
import { useCharacterById } from '../../hooks/useCharacterByID.ts';
import { Col, Row } from 'antd';
import { Typography } from 'antd';

const CharacterDetail = () => {
  const { id } = useParams();
  const { loading, error, character } = useCharacterById(id || '');
  const { Title } = Typography;

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div style={{ padding: '40px' }}>
      <Row>
        <Col span={4}>
          <Title>{character?.name}</Title>
          <Title level={4}>
            <strong>Gender:</strong> {character?.gender}
          </Title>
          <Title level={4}>
            <strong>Height:</strong> {character?.height}
          </Title>
          <Title level={4}>
            <strong>Mass:</strong> {character?.mass}
          </Title>
          <Title level={4}>
            <strong>Home Planet:</strong> {character?.homeworld.name}
          </Title>
          <Title level={4}>
            <strong>Species:</strong> {character?.species?.name}
          </Title>
          <Title level={4}>
            <strong>Eye Color:</strong> {character?.eyeColor}
          </Title>
        </Col>
        <Col span={12}>
          <img
            src="../../assets/images/star-wars-background.jpg"
            className="character-image"
            alt="character-details"
          />
        </Col>
        <Col span={8}>
          <Title level={3}>Films</Title>
          <ul>
            {character?.filmConnection.films.map((film, index) => (
              <li key={index}>
                <Title level={4}>
                  {film.title} ({film.releaseDate})
                </Title>
              </li>
            ))}
          </ul>
        </Col>
      </Row>
    </div>
  );
};

export default CharacterDetail;
