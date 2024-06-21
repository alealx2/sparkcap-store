import { fetchSanityData } from "../sanityData.client";
import { useState, useEffect } from "react";
import { Link } from "@shopify/hydrogen";
 

export default function Footer({collections}){

  //Fetch store brand data and footer menu links from sanity
  const storeQuery = `
    *[_type == "storeInfo"]{
        address, 
        phone,        
        email, 
        social[]{
            _key,
            url,
            newWindow,
            "logoUrl": logo.asset->url,
        },         
        copyright,    
        "secondLogoUrl": secondLogo.asset->url,
    }
  `;  

  const footerMenuQuery = `
    *[_type == "footerMenu"]{
        _id,
        title,
        menulinks[]
    }
  `;  

  const [storeData, setStoreData] = useState([]);
  const [footerData, setFooterData] = useState([]);
  
  useEffect(() => {
    async function getData() {
      const data = await fetchSanityData(storeQuery);
      setStoreData(data[0]);
    }
    getData();
  }, []);

  useEffect(() => {
    async function getData() {
      const data = await fetchSanityData(footerMenuQuery);
      setFooterData(data);
    }
    getData();
  }, []);

  console.log('Store data footer:')
  console.log(storeData.social)  
  console.log('footer data:')
  console.log(footerData) 

    return(
        <footer>
            <div className="copyright">
                <span>{storeData.copyright}</span>
            </div>
            <div className="footerMenu">
                
                <div className="footer-logo">
                    {storeData.secondLogoUrl && (
                        <a href="/">
                            <img src={storeData.secondLogoUrl} alt={storeData.name} title={storeData.name}/>
                        </a>
                    )}
                </div>

                <div className="footer-contact">
                    <ul>
                    
                        <li>{storeData.address}</li>
                        <li>{storeData.email}</li>
                        <li>{storeData.phone}</li>

                        <div className="rrss">
                            {storeData.social && 
                                storeData.social.map((redSocial) =>(
                                    <li key={redSocial._key}>
                                        <a href={redSocial.url}>
                                            <img src={redSocial.logoUrl} />
                                        </a>
                                    </li>
                                ))
                            } 
                        </div>
                    </ul>
                </div>

                {footerData && footerData.map((menu) =>(
                    <div className="footer-links" key={menu._id}>
                        <ul>
                            <li className="footmenu-title">{menu.title}</li>
                            {menu.menulinks && menu.menulinks.map((link) =>(
                                <li key={link._key}>
                                    <a href={link.url}>
                                        {link.linkText}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                    ))
                }       
            </div>
        </footer>
    )
}