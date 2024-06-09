import { useShopQuery, gql, CacheLong, useRouteParams, Seo } from "@shopify/hydrogen";
import { Suspense } from "react";

import Layout from "../../components/Layout.server";
import ProductSearchGrid from '../../components/ProductSearchGrid.client'

export default function Search(){

    const { handle } = useRouteParams();

    const { data: { products: {nodes: products} } } = useShopQuery({
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
                <div className="product-grid search-grid">
                  <ProductSearchGrid products={products}/>
                </div>
            </div>
        </Layout>
    )
}

const SEARCH_QUERY = gql`
query Search($handle: String!) {
    products(query: $handle, first: 5) {    
        nodes {
            id
            title
            descriptionHtml
            handle
            media(first: 1) {
                nodes {
                    ... on MediaImage {
                        id
                        image {
                        id
                        url
                        width
                        height
                        altText
                        }
                    }
                }
            }
            variants(first: 5) {
                nodes {
                    id
                    availableForSale
                    price {
                        amount
                        currencyCode
                    }
                    compareAtPrice {
                        amount
                        currencyCode
                    }
                    selectedOptions {
                        name
                        value
                    }
                }
            }   
        }             
    }  
}
`;