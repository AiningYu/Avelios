import React from 'react';
import { useParams } from 'react-router-dom';
import { useCharacterById } from '../../hooks/useCharacterByID.ts';
import { Card, Col, Grid, Row } from 'antd';
import { Typography } from 'antd';
// @ts-ignore
import starWarsImage from '../../assets/images/character-details.jpg';

const CharacterDetail = () => {
  const { id } = useParams();
  const { loading, error, character } = useCharacterById(id || '');
  const { Title } = Typography;

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <Card style={{
      backgroundColor: 'rgba(233, 230, 209, 0.01)'
    }}
          bordered={false}>
      <Row  justify="center" style={{maxHeight: 50}}>
        <Title style={{ color: '#E9E6D1'}}>{character?.name}</Title>
      </Row>
      <Row justify="center" style={{ marginTop: 2 }}>
        <Col
          span={8}
          style={{
            textAlign: 'right',
          }}
        >
          <Card
            style={{
              backgroundColor: 'rgba(233, 230, 209, 0.06)',
            }}
            bordered={false}
          >
            <Title level={3} style={{ textAlign: 'center', color: '#E9E6D1' }}>
              Character Information
            </Title>
            <div
              style={{
                paddingRight: 80,
              }}
            >
              <Title level={4} style={{ color: '#E9E6D1' }}>
                <div
                  style={{
                    textAlign: 'center',
                  }}
                >
                  Gender:
                </div>
                <div>{character?.gender ? character.gender : '-'}</div>
              </Title>
              <Title level={4} style={{ color: '#E9E6D1' }}>
                <div
                  style={{
                    textAlign: 'center',
                  }}
                >
                  Height:
                </div>
                <div>{character?.height ? character.height : '-'}</div>
              </Title>
              <Title level={4} style={{ color: '#E9E6D1' }}>
                <div
                  style={{
                    textAlign: 'center',
                  }}
                >
                  Weight:
                </div>
                <div style={{ paddingLeft: '10px' }}>
                  {character?.mass ? character.mass : '-'}
                </div>
              </Title>
              <Title level={4} style={{ color: '#E9E6D1' }}>
                <div
                  style={{
                    textAlign: 'center',
                  }}
                >
                  Birth Year:
                </div>
                <div style={{ paddingLeft: '10px' }}>
                  {character?.birthYear ? character.birthYear : '-'}
                </div>
              </Title>
              <Title level={4} style={{ color: '#E9E6D1' }}>
                <div
                  style={{
                    textAlign: 'center',
                  }}
                >
                  Home Planet:
                </div>
                <div style={{ paddingLeft: '10px' }}>
                  {character?.homeworld?.name ? character.homeworld.name : '-'}
                </div>
              </Title>
              <Title level={4} style={{ color: '#E9E6D1' }}>
                <div
                  style={{
                    textAlign: 'center',
                  }}
                >
                  Species:
                </div>
                <div style={{ paddingLeft: '10px' }}>
                  {character?.species?.name ? character.species.name : '-'}
                </div>
              </Title>
              <Title level={4} style={{ color: '#E9E6D1' }}>
                <div
                  style={{
                    textAlign: 'center',
                  }}
                >
                  Eye Color:
                </div>
                <div style={{ paddingLeft: '10px' }}>
                  {character?.eyeColor ? character.eyeColor : '-'}
                </div>
              </Title>
              <Title level={4} style={{ color: '#E9E6D1' }}>
                <div
                  style={{
                    textAlign: 'center',
                  }}
                >
                  Skin Color:
                </div>
                <div style={{ paddingLeft: '10px' }}>
                  {character?.skinColor ? character.skinColor : '-'}
                </div>
              </Title>
              <Title level={4} style={{ color: '#E9E6D1' }}>
                <div
                  style={{
                    textAlign: 'center',
                  }}
                >
                  Hair Color:
                </div>
                <div style={{ paddingLeft: '10px' }}>
                  {character?.hairColor ? character.hairColor : '-'}
                </div>
              </Title>
            </div>
          </Card>
        </Col>
        <Col
          span={8}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '10px',
            maxHeight: '800px',
            overflow: 'hidden',
          }}
        >
          <img
            src={starWarsImage}
            className="character-image"
            alt="character-details"
            style={{
              maxWidth: '100%',
              maxHeight: '100%',
              objectFit: 'contain',
            }}
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
            <Card
              style={{
                backgroundColor: 'rgba(233, 230, 209, 0.06)',
                minHeight: '40%',
                minWidth: '100%',
                marginBottom: '20px',
              }}
              bordered={false}
            >
              <Title
                level={3}
                style={{ textAlign: 'center', color: '#E9E6D1' }}
              >
                Films
              </Title>
              <ul>
                {character?.filmConnection.films.map((film, index) => (
                  <div key={index}>
                    <Title level={4} style={{ color: '#E9E6D1' }}>
                      {film.title} ({film.releaseDate})
                    </Title>
                  </div>
                ))}
              </ul>
            </Card>
            <Card
              style={{
                minHeight: '40%',
                minWidth: '100%',
                backgroundColor: 'rgba(233, 230, 209, 0.06)',
              }}
              bordered={false}
            >
              <Title
                level={3}
                style={{ textAlign: 'center', color: '#E9E6D1' }}
              >
                Vehicles
              </Title>
              <ul>
                {character?.vehicleConnection.vehicles.map((vehicle, index) => (
                  <div key={index}>
                    <Title level={4} style={{ color: '#E9E6D1' }}>
                      {vehicle.model}
                    </Title>
                  </div>
                ))}
              </ul>
            </Card>
        </Col>
      </Row>
    </Card>
  );
};

export default CharacterDetail;
