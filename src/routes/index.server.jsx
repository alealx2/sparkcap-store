import { Link, Image, useShopQuery, CacheLong, gql } from '@shopify/hydrogen';
import { Suspense } from 'react';

import Layout from '../components/Layout.server';
import ProductCard from '../components/ProductGridItem.client';
import CollectionCard from '../components/CollectionGridItem.client';
import SwiperBanner from '../components/SwiperBanner.client';

export default function Home() {

  const homeData = useShopQuery({
    query: HOME_QUERY,
    CacheLong: CacheLong(),
    preload: true
  });
  
  const {data: { collections: {nodes: collections } } } = homeData;  
  const {data: { products: { nodes: products } } } = homeData;  

  return (
    <Layout>
      <Suspense>

        <div className='home-banner'>
              <SwiperBanner data={collections}/>              
        </div>

        <div className="home-page container">

          <h1>Best Seller Products</h1>
          <div className="product-grid">
              {products.map((product) => (
                  <ProductCard product={product}></ProductCard>
              ))}
          </div>

          <h1>Best Seller Collections</h1>
          <div className='collections-grid'>
            {collections.map((collection) =>(
              collection.image ?  
              <CollectionCard collection={collection}></CollectionCard>            
              : null 
            ))}             
          </div>
        </div>
      </Suspense>
    </Layout>
  );
}

//Fetch store collections and products info
const HOME_QUERY = gql`
query homeInfo{
  collections(first: 10) {
    nodes {
      id
      title
      handle
      image{
        id
        url
        altText  
        height
        width       
      }      
    }    
  },
  products(first: 6) {
    nodes {
      title
      handle
      featuredImage {
        url
        altText
        height
        width
      }
      variants(first: 1) {
        nodes {
          price {
            amount
            currencyCode
          }
          compareAtPrice {
            amount
            currencyCode
          }
        }
      }
    }
  }  
}
`;

