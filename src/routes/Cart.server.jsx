import { useShopQuery, CacheLong, gql } from '@shopify/hydrogen';

import Layout from '../components/Layout.server';
import CartPage from '../components/CartPage.client';

export default function Cart() {

    const data = useShopQuery({
        query: QUERY,
        cache: CacheLong(),
        preload: true
    });

    const { data: {products: { nodes } } } = data;  
    
    return (
        <Layout>
            <div className="container">
                <CartPage products={nodes}/>
            </div>
        </Layout>
    )
}

const QUERY = gql`
query BestSellingProducts {
    products(first: 4, sortKey: BEST_SELLING) {
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
        options {
          name
          values
        }              
      }
    }
  }
`;