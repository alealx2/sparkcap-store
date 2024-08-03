import { useShopQuery, gql, CacheLong, useRouteParams, Seo } from "@shopify/hydrogen";
import { Suspense } from "react";

import Layout from "../../components/Layout.server";
import ProductCard from "../../components/ProductCard.client";

export default function Search(){

    const { handle } = useRouteParams();

    const { data: { products: {nodes: products } } } = useShopQuery({
        query: SEARCH_QUERY,
        cache: CacheLong(),
        preload: true,        
        variables: {
          handle
        }
    })
    
    console.log(products)

    return (
        <Layout>
            {/* <Suspense>
                <Seo type="product" data={products.nodes[0]} />
            </Suspense> */}
                <h1 className="search-title mt-5">
                    {products.length} Results for "{handle}"
                </h1>

            <div className="product-page container">
                <div className="product-grid">
                    {products.map((product) => (
                        <ProductCard product={product}></ProductCard>
                    ))}                
                </div>
            </div>
        </Layout>
    )
}

const SEARCH_QUERY = gql`
query Search($handle: String!) {
    products(query: $handle, first: 5) {    
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
            variants(first: 5) {
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