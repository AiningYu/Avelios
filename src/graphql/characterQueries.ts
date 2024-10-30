import { gql } from '@apollo/client';

export const GET_CHARACTERS = gql`
    query GetCharacters($first: Int, $after: String) {
        allPeople(first: $first, after: $after) {
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
                }
                cursor
            }
            pageInfo {
                endCursor
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
            filmConnection {
                films {
                    title
                    releaseDate
                }
                totalCount
            }
        }
    }
`;

