import {client} from '../lib/sanity.client';

export async function fetchSanityData(query) {
  try {
    const data = await client.fetch(query);
    return data;
  } catch (error) {
    console.error('Sanity fetch error:', error);
    return null;
  }
}
