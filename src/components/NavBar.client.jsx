import { Link } from '@shopify/hydrogen';
import FloatingMenu from './FloatingMenu.client';

import { fetchSanityData } from '../sanityData.client';
import { useEffect, useState } from 'react';

export default function NavBar({collections}){

    const sanityQuery = '*[_type == "collection"]'; 

    const [cmsData, setSanityData] = useState([]);
  
    useEffect(() => {
      async function getData() {
        const sanityData = await fetchSanityData(sanityQuery);
        setSanityData(sanityData);
      }
      getData();
    }, []);
  
    console.log('Sanity cms data:')
    console.log(cmsData)

    return (
        <ul className="header-navigation">
            <li><a href="/catalog">Catalog</a></li>
            <li>
                <FloatingMenu menu={collections}/>
            </li>
            <li><a href="/blog">Blog</a></li>
        </ul>        
    )
}

