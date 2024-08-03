import { createClient } from '@sanity/client'

export const client = createClient({
    projectId: import.meta.env.VITE_SANITY_STUDIO_PROJECT_ID,
    dataset: import.meta.env.VITE_SANITY_STUDIO_DATA_SET,
    useCdn: true, 
    apiVersion: '2024-06-10', 
    token: import.meta.env.VITE_SANITY_STUDIO_TOKEN
})
