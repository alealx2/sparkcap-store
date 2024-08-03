import {defineConfig} from 'vite';
import hydrogen from '@shopify/hydrogen/plugin';
import { configDotenv } from 'dotenv';

export default defineConfig({
  plugins: [hydrogen(), configDotenv()],
});
