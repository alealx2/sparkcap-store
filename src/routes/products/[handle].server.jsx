import { useShopQuery, gql, CacheLong, useRouteParams, Seo } from "@shopify/hydrogen";
import { Suspense } from "react";

import Layout from "../../components/Layout.server";
import ProductDetails from "../../components/ProductDetails.client";
import BestSellingProductGrid from "../../components/BestSellingProductsGrid.client";

export default function Product() {
    const { handle } = useRouteParams();

    const { data: { product: product } } = useShopQuery({
        query: QUERY,
        variables: {
            handle
        }
    })

    const relatedProducts = product.collections.nodes[0]?.products.nodes || [];

    return (
        <Layout>
            <Suspense>
                <Seo type="product" data={product} />
            </Suspense>
            <div className="product-page container">

              {/* Product info */}
              <div className="product-sec">
                <div className="product-page-item">
                  <ProductDetails product={product}/>
                </div>
              </div>

              {/* Related products */}
              <div className='related-products'>
                  <h1>You may also like</h1>
                  <p>
                      Combine this product with some of these nice options.
                  </p>               
                  <BestSellingProductGrid products={relatedProducts}/>                
              </div>                
            </div>
        </Layout>
    )
}

const QUERY = gql`
query Product($handle: String!) {
    product(handle: $handle) {
        title
        descriptionHtml
        media(first: 4) {
            nodes {
                ... on MediaImage {
                    id
                    image {
                        url
                        width
                        height
                        altText
                    }
                }
            }
        }
        variants(first: 12) {
            nodes {
                id
                availableForSale
                quantityAvailable
                priceV2 {
                    amount
                    currencyCode
                }
                compareAtPriceV2 {
                    amount
                    currencyCode
                }
                selectedOptions {
                    name
                    value
                }
                image {
                    url
                    width
                    height
                    altText
                }
            }
        }
        collections(first: 1) {
            nodes {
              products(first: 4) {
                  nodes {
                    title
                    handle
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
    }
}
`;
