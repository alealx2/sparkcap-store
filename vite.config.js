import { defineConfig } from 'vite';
import hydrogen from '@shopify/hydrogen/plugin';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

export default defineConfig({
  plugins: [hydrogen()],
  resolve: {
    alias: {
      'vite': path.resolve(__dirname, 'node_modules/vite/dist/node/index.js'),
    },
  },
});
