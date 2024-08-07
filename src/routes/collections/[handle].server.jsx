import { useShopQuery, CacheLong, gql, useRouteParams, Image } from '@shopify/hydrogen';
import { Suspense } from 'react';

import Layout from '../../components/Layout.server';
import SideBarFilter from '../../components/SideBarFilters.client';

export default function Collection() {
    const { handle } = useRouteParams();

    const data = useShopQuery({
        query: QUERY,
        cache: CacheLong(),
        preload: true,
        variables: {
            handle
        }
    });

    const { data: { collection: collection }} = data;
    const { products: { nodes } } = collection;
    

    return (
        <Layout>
            <Suspense>
                <div className="catalog-page container">
                    <div className='collection-banner'>
                      <Image 
                        key={collection.image.id}
                        data={collection.image}
                        alt={collection.image.altText}
                      />                                       
                    </div>
                    <h1>{collection.title}</h1>
                    <SideBarFilter data={nodes} />
                </div>
            </Suspense>
        </Layout>
    )
}

const QUERY = gql`
query CollectionDetails($handle: String!) {
    collection(handle: $handle) {
      id
      title
      description
      handle
      image{
        id
        url
        altText  
        height
        width       
      }
      seo {
          description
          title
      }
      products(first: 9) {
        nodes {
          id
          title
          handle
          publishedAt          
          featuredImage {
            url
            altText
            height
            width
          }
          images(first: 4) {  
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
          options {
          name
          values
          }              
        }
      }
    }
  }
`;