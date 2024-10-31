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
    <>
      <Row justify="center" align="top">
        <Title style={{ color: '#E9E6D1' }}>{character?.name}</Title>
      </Row>
      <Row justify="center">
        <Col
          span={4}
          style={{
            textAlign: 'left',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Title level={4} style={{ color: '#E9E6D1' }}>
            Gender: {character?.gender}
          </Title>
          <Title level={4} style={{ color: '#E9E6D1' }}>
            Height: {character?.height}
          </Title>
          <Title level={4} style={{ color: '#E9E6D1' }}>
            Weight: {character?.mass}
          </Title>
          <Title level={4} style={{ color: '#E9E6D1' }}>
            Birth Year: {character?.birthYear}
          </Title>
          <Title level={4} style={{ color: '#E9E6D1' }}>
            Home Planet: {character?.homeworld.name}
          </Title>
          <Title level={4} style={{ color: '#E9E6D1' }}>
            Species: {character?.species?.name}
          </Title>
          <Title level={4} style={{ color: '#E9E6D1' }}>
            Eye Color: {character?.eyeColor}
          </Title>
          <Title level={4} style={{ color: '#E9E6D1' }}>
            Skin Color: {character?.skinColor}
          </Title>
          <Title level={4} style={{ color: '#E9E6D1' }}>
            Hair Color: {character?.hairColor}
          </Title>

        </Col>
        <Col
          span={12}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <img
            src="../../assets/images/star-wars-background.jpg"
            className="character-image"
            alt="character-details"
          />
        </Col>
        <Col
          span={8}
          style={{
            textAlign: 'left',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <ul>
            {character?.filmConnection.films.map((film, index) => (
              <div key={index}>
                <Title level={4} style={{ color: '#E9E6D1' }}>
                  {film.title} ({film.releaseDate})
                </Title>
              </div>
            ))}
          </ul>
        </Col>
      </Row>
    </>
  );
};

export default CharacterDetail;
