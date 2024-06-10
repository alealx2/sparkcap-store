import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: '500c01m0',
    dataset: 'production',
    useCdn: true, 
    apiVersion: '2024-06-10',     
  }
})
