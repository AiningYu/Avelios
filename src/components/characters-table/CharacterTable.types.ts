import { Film } from '../../graphql/graphql.ts';

export type CharacterNode = {
  id: string;
  name: string;
  height: string;
  mass: string;
  homeworld?: { name: string };
  species?: { name: string };
  gender: string;
  eyeColor: string;
  filmConnection: {
    films: Film[];
    totalCount: number;
  };
};

export type CharacterEdge = {
  node: CharacterNode;
  cursor: string;
};

export interface CharacterTableProps {
  page: number;
}
