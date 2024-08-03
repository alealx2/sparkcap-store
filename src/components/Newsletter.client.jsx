import { useState, useEffect } from "react";
import { fetchSanityData } from "../sanityData.client";
import { Link } from "@shopify/hydrogen";

export default function Newsletter(){

    const [newsletterData, setSanityData ] = useState([]);

    useEffect(() => {
        async function getData() {
          const sanityData = await fetchSanityData(sanityQuery);
          setSanityData(sanityData[0]);
        }
        getData();
      }, []);
    
    // console.log('newsletter data')  
    // console.log(newsletterData)


    return(
      <>
      {newsletterData && newsletterData.showNewsletter ? (
            <>
                <div className="newsletter-image">
                    <img src={newsletterData.newsletter.image}/>
                </div>
                <div className="newsletter-form">
                    <h3>{newsletterData.newsletter.text}</h3>
                    <input type="text" placeholder="Email..." required/>
                    <button>{newsletterData.newsletter.buttontxt}</button>
                </div>      
            </>      
        ) : (
            null
        )
        }
      </>
    )
}

const sanityQuery = `
*[_type == "home"]{
    showNewsletter,
    newsletter{
        text,
        buttontxt,
        "image": image.asset->url
    },
}
`;