import { gql } from '@apollo/client';

export const GET_ALL_PEOPLE_QUERY = gql`
  query GetAllPeople {
    allPeople {
      people {
        gender
        eyeColor
        species {
          name
        }
      }
    }
  }
`;

export const GET_ALL_FILMS = gql`
  query GetAllFilms {
    allFilms {
      films {
        title
      }
    }
  }
`;

export const GET_CHARACTERS = gql`
  query GetCharacters(
    $first: Int
    $last: Int
    $after: String
    $before: String
  ) {
    allPeople(first: $first, last: $last, after: $after, before: $before) {
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
