import { fetchSanityData } from "../sanityData.client";
import NavBar from "./NavBar.client";
import CartDrawer from "./CartDrawer.client";
import PredictiveSearch from "./PredictiveSearch.client";
import { useState, useEffect } from "react";
import { Link } from "@shopify/hydrogen";

export default function Header(){

  //Fetch store brand data from sanity
  const sanityQuery = `
    *[_type == "storeInfo"]{
    name,
    "mainLogoUrl": mainLogo.asset->url,
    }
  `;  

  const [storeData, setSanityData] = useState([]);
  
  useEffect(() => {
    async function getData() {
      const sanityData = await fetchSanityData(sanityQuery);
      setSanityData(sanityData[0]);
    }
    getData();
  }, []);

  // console.log('Store data:')
  // console.log(storeData)  

    return (
        <header className="container">
            <div className="container header-inner">

                <Link to="/" className="header-logo">
                    {storeData.mainLogoUrl && (
                        <img src={storeData.mainLogoUrl} alt={storeData.name} title={storeData.name}/>
                    )}
                </Link>

                <NavBar/>                        

                <div className="header-options">
                  <PredictiveSearch />
                  <CartDrawer />
                </div>                
            </div>
        </header>
    )
}
