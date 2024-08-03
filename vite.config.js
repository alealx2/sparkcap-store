import { defineConfig } from 'vite';
import hydrogen from '@shopify/hydrogen/plugin';
import dotenv from 'dotenv';
dotenv.config();

export default defineConfig({
  plugins: [hydrogen()],
});
