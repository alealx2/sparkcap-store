import { createClient } from '@sanity/client'

export const client = createClient({
    projectId: '500c01m0',
    dataset: 'production',
    useCdn: true, 
    apiVersion: '2024-06-10', 
    token: 'skmLulKkVnBAoymmg4t2tFdj0YdgdJwIlzj1f6OTzfKzcQMY7Bo96vjKKvchOggOSTvobkAIM2UFVcOKEvRUXpysCruz0XhjGXjgru8GGIZvwIt8ffbWoFDKCqTYeoMaI9oh4DmfQwrhtAtcdrUaw3g62PhQ2bhsjopVTT61EK9Jm36k0oBg'      
})
