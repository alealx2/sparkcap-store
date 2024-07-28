import React, { useState } from 'react';

import { Link, Image, Money } from '@shopify/hydrogen';
import { MagnifyingGlassPlusIcon, MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';
import ProductCard from './ProductCard.client';

const PredictiveSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState(['']);
  const [searchOpen, setSearchOpen] = useState(false);

  const handleChange = async (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    // Make a request to Shopify Storefront API
    try {
      //Demo: 'https://hydrogen-preview.myshopify.com/api/graphql'
      const response = await fetch('https://0134e1-de.myshopify.com/api/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Storefront-Access-Token': 'cedee87268c0073d714c5baff1f550f4',//Demo: '3b580e70970c4528da70c98e097c2fa0',
        },
        body: JSON.stringify({
          query: `
          query{
            products(query: "${query}", first: 5) {    
              nodes {
                  id
                  title
                  descriptionHtml
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
          `,
        }),
      });

      const data = await response.json();
      const { data: {products: { nodes: searchResults } } } = data;

      const resultList = document.getElementById('resultList');
      const goToResults = document.getElementById('goToResults');


      if(searchResults.length == 0 || query == ""){
        resultList.style.display = 'none';
      }else{
        resultList.style.display = 'flex';
      }
      setSearchResults(searchResults);
      goToResults.href = "http://" + window.location.host + "/search/" + query;

    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  const callsToAction = [
    { name: 'Go to full results', href: '#', icon: MagnifyingGlassPlusIcon },
  ]

  return (

    <>
      <div className='searcher'>
        {searchOpen ? (
          <XMarkIcon onClick={() => setSearchOpen(false)} />
        ):(
          <MagnifyingGlassIcon onClick={() => setSearchOpen(true)} />
        )
        }
      </div>
      {searchOpen ? (
        <>
          <div className="header-search-wrap">
            <form>
              <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
              <div className="relative md:ml-12 ml-0">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                  </svg>
                </div>
                <input
                  type="search"
                  id="default-search"
                  className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-gray-200 focus:border-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={handleChange}           
                />
              </div>
            </form>
          </div>    

          <div id="resultList" className='searchResults'>
            <div className='proucts-result product-grid search-grid'>
              {searchResults.length > 1 && searchResults.map((product) => (
                  <ProductCard product={product}></ProductCard>      
              ))}
            </div>

            <div className="grid grid-cols-1 divide-x divide-gray-900/5 bg-gray-50">
                  {callsToAction.map((item) => (
                    <a
                      id="goToResults"
                      key={item.name}
                      href={item.href}
                      className="flex items-center justify-center gap-x-2.5 p-3 font-semibold text-gray-900 hover:bg-gray-100"
                    >
                      <item.icon className="h-5 w-5 flex-none text-gray-400" aria-hidden="true" />
                      {item.name}
                    </a>
                  ))}
              </div>

          </div>
        </>
      ) : (null)
      }
    </>
  );
};

export default PredictiveSearch;
