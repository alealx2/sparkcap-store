import {defineConfig} from '@shopify/hydrogen/config';

export default defineConfig({
  shopify: {
    storeDomain: process.env.SHOPIFY_STORE_DOMAIN, //Demo: 'hydrogen-preview.myshopify.com',
    storefrontToken: process.env.SHOPIFY_STOREFRONT_API_TOKEN, //Demo: '3b580e70970c4528da70c98e097c2fa0',
    storefrontApiVersion: process.env.SHOPIFY_STOREFRONT_API_VERSION,
  },
});
