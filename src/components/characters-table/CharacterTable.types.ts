import { Film } from '../../graphql/graphql.ts';

export interface Homeworld {
  name: string;
}

export interface Species {
  name: string;
}

export interface FilmConnection {
  films: Film[];
  totalCount: number;
}

export interface CharacterNode {
  id: string;
  name: string;
  height: string;
  mass: string;
  homeworld?: Homeworld;
  species?: Species;
  gender: string;
  eyeColor: string;
  filmConnection: FilmConnection;
}

export interface CharacterEdge {
  node: CharacterNode;
  cursor: string;
}

