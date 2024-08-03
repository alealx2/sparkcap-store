import {client} from '../lib/sanity.client';


export async function fetchSanityData(query, handle = null) {
  try {
    const params = handle ? { slug: handle } : {};
    const data = await client.fetch(query, params);
    return data;
  } catch (error) {
    console.error('Sanity fetch error:', error);
    return null;
  }
}
