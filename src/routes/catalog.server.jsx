import { useShopQuery, CacheLong, gql } from '@shopify/hydrogen';
import { Suspense } from 'react';

import Layout from '../components/Layout.server';
import ProductCard from '../components/ProductGridItem.client';

export default function Catalog() {

    const data = useShopQuery({
        query: QUERY,
        cache: CacheLong(),
        preload: true,
    });

    const { data: { products: { nodes } } } = data;

    return (
        <Layout>
            <Suspense>
                <div className="catalog-page container">
                    <div className="product-grid">
                        {nodes.map((product) => (
                            <ProductCard key={product.id} product={product}></ProductCard>
                        ))}
                    </div>
                </div>
            </Suspense>
        </Layout>
    )
}

const QUERY = gql`
query products {
    products(first: 20) {
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