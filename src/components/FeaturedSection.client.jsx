import { useState, useEffect } from "react";
import { fetchSanityData } from "../sanityData.client";

export default function FeaturedSection(){

    const [featuredData, setSanityData ] = useState([]);

    useEffect(() => {
        async function getData() {
          const sanityData = await fetchSanityData(sanityQuery);
          setSanityData(sanityData[0].featured);
        }
        getData();
      }, []);
    
    // console.log('featured data')  
    // console.log(featuredData)


    return(
      <>
        {featuredData ? (
            featuredData.map((item)=>(
              <div key={item.key}>
                <img src={item.imageUrl}/>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            ))
          ):(
            null
          )
        }
      </>
    )
}

const sanityQuery = `
*[_type == "home"]{
    featured[]{
      "key": _key,
      title,
      text,
      "imageUrl": image.asset->url,
    }
  }
`;