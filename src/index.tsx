import React from 'react';
import ReactDOM from 'react-dom/client';
import { ConfigProvider } from 'antd';
import App from './App';
import {gql} from "@apollo/client";

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

const rootElement = document.getElementById('root');
if (rootElement) {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
        <ConfigProvider>
            <App />
        </ConfigProvider>
    );
}

