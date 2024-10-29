import type { TypedDocumentString } from './graphql'

export async function execute<TResult, TVariables>(
    query: TypedDocumentString<TResult, TVariables>,
    ...[variables]: TVariables extends Record<string, never> ? [] : [TVariables]
) {
    const response = await fetch('https://swapi-graphql.netlify.app/.netlify/functions/index', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/graphql-response+json'
        },
        body: JSON.stringify({
            query: document,
            variables
        })
    })

    if (!response.ok) {
        throw new Error('Network response was not ok')
    }

    return response.json() as TResult
}