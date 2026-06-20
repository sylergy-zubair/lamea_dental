const WP_GRAPHQL_URL = process.env.WP_GRAPHQL_ENDPOINT;

export async function graphqlFetch<T>(
  query: string,
  variables?: Record<string, unknown>
): Promise<T> {
  if (!WP_GRAPHQL_URL) {
    throw new Error('WP_GRAPHQL_ENDPOINT env var not set');
  }

  const res = await fetch(WP_GRAPHQL_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query, variables }),
    // ISR: Next.js will respect this on the server side;
    // for static pages the revalidate export below takes precedence
  });

  if (!res.ok) {
    throw new Error(`WPGraphQL error: ${res.status} ${res.statusText}`);
  }

  const json = await res.json();

  if (json.errors) {
    throw new Error(
      `GraphQL errors: ${json.errors.map((e: { message: string }) => e.message).join(', ')}`
    );
  }

  return json.data as T;
}
