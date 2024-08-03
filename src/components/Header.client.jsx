import { fetchSanityData } from "../sanityData.client";
import NavBar from "./NavBar.client";
import CartDrawer from "./CartDrawer.client";
import PredictiveSearch from "./PredictiveSearch.client";
import { useState, useEffect } from "react";
import { Link } from "@shopify/hydrogen";

export default function Header(){

  const [sanityData, setSanityData] = useState([]);

  useEffect(() => {
    async function getData() {
      const data = await fetchSanityData(sanityQuery);
      setSanityData(data);
    }
    getData();
  }, []);

  // console.log('Store data:')
  //console.log(sanityData)  

    return (
        <header className="container">
          {sanityData.storeInfo && sanityData.megaMenu ? (
            <div className="container header-inner">
              <Link to="/" className="header-logo">
                  {sanityData.storeInfo[0].mainLogoUrl && (
                      <img src={sanityData.storeInfo[0].mainLogoUrl} alt={sanityData.storeInfo[0].name} title={sanityData.storeInfo[0].name}/>
                  )}
              </Link>

              <NavBar navigationData={sanityData.megaMenu}/>                        

              <div className="header-options">
                <PredictiveSearch />
                <CartDrawer />
              </div>                
            </div>
          ):(
            // <p className="text-center"> You must configure header logo and menu navigation from sanity cms </p>
            null
          )}
        </header>
    )
}

const sanityQuery = `
{
  "storeInfo": *[_type == "storeInfo"]{
    name,
    "mainLogoUrl": mainLogo.asset->url,
  },
  "megaMenu": *[_type == "megaMenu"]{
    _id,
    title,
    collectionLinks[]->{
      _id,
      "title": store.title,
      "slug": store.slug.current,
      "handle": store.handle,
      "imageUrl": store.imageUrl.asset->url
    },
    customLink,
    customUrl,
    images[]{
      _key,
      "url": asset->url
    }
  }
}
`;  
