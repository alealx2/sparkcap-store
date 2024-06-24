import { Link, Image, useShopQuery, CacheLong, gql } from '@shopify/hydrogen';
import { Suspense, useEffect, useState } from 'react';

import Layout from '../components/Layout.server';
import ProductCard from '../components/ProductCard.client';
import CollectionCard from '../components/CollectionGridItem.client';
import SwiperBanner from '../components/SwiperBanner.client';
import FeaturedSection from '../components/FeaturedSection.client';
import ImageHotspots from '../components/ImageHotspots.client';
import Newsletter from '../components/Newsletter.client';

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

        <div className='home-banner container'>
              <SwiperBanner/>              
        </div>

        <div className="home-page container">

          <h1>The Sparkcap difference</h1>
          <div className='featured-section'>
            <FeaturedSection/>
          </div>

          <h1>Best Seller Products</h1>
          <div className="product-grid">
              {products.map((product) => (
                  <ProductCard product={product}></ProductCard>
              ))}
          </div>
          
          <h1>Direct to your bag</h1>
          <div className='hotspot-section'>
            <ImageHotspots/>
          </div>

          <h1>Best Seller Collections</h1>
          <div className='collections-grid'>
            {collections.map((collection) =>(
              collection.image ?  
              <CollectionCard collection={collection}></CollectionCard>            
              : null 
            ))}             
          </div>

          <div className='newsletter-section'>
            <Newsletter/>
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
  products(first: 8) {
    nodes {
      title
      handle
      featuredImage {
        url
        altText
        height
        width
      }
      images(first: 3) {  
        edges {
          node {
            id
            url
            altText
            width
            height
          }
        }
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

