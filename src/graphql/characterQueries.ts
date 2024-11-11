import { gql } from '@apollo/client';

export const GET_CHARACTERS = gql`
  query GetCharacters($cursor: String) {
    allPeople(first: 10, after: $cursor) {
      edges {
        node {
          id
          name
          height
          mass
          homeworld {
            name
          }
          species {
            name
          }
          gender
          eyeColor
          filmConnection {
            films {
              title
              releaseDate
            }
            totalCount
          }
        }
        cursor
      }
      pageInfo {
        endCursor
        hasPreviousPage
        startCursor
        hasNextPage
      }
    }
  }
`;

export const GET_CHARACTER_BY_ID = gql`
  query GetCharacterById($id: ID!) {
    person(id: $id) {
      id
      name
      height
      mass
      homeworld {
        name
      }
      species {
        name
      }
      gender
      eyeColor
      skinColor
      hairColor
      birthYear
      filmConnection {
        films {
          title
          releaseDate
        }
        totalCount
      }
      vehicleConnection {
        vehicles {
          model
        }
      }
    }
  }
`;
