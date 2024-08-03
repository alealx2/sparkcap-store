import { fetchSanityData } from "../sanityData.client";
import { useState, useEffect } from "react";
import { Link } from "@shopify/hydrogen";
 

export default function Footer(){
  

  const [sanityData, setSanityData] = useState([]);
  
  useEffect(() => {
    async function getData() {
      const data = await fetchSanityData(sanityQuery);
      setSanityData(data);
    }
    getData();
  }, []);

//   console.log('Store data footer:')
//   console.log(sanityData) 

    return(
        <footer className="container">
            {sanityData.storeInfo && sanityData.footerMenu ? (
                <>
                    <div className="copyright">
                        <span>{sanityData.storeInfo[0].copyright}</span>
                    </div>
                    <div className="footerMenu">                        
                        <div className="footer-logo">
                            {sanityData.storeInfo[0].secondLogoUrl && (
                                <a href="/">
                                    <img src={sanityData.storeInfo[0].secondLogoUrl} alt={sanityData.storeInfo[0].name} title={sanityData.storeInfo[0].name}/>
                                </a>
                            )}
                        </div>

                        <div className="footer-contact">
                            <ul>
                            
                                <li>{sanityData.storeInfo[0].address}</li>
                                <li>{sanityData.storeInfo[0].email}</li>
                                <li>{sanityData.storeInfo[0].phone}</li>

                                <div className="rrss">
                                    {sanityData.storeInfo[0].social && 
                                        sanityData.storeInfo[0].social.map((redSocial) =>(
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

                        {sanityData.footerMenu && sanityData.footerMenu.map((menu) =>(
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
                </>
            ):(null)}
        </footer>
    )
}

const sanityQuery = `
{
  "storeInfo": *[_type == "storeInfo"]{
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
  },
  "footerMenu": *[_type == "footerMenu"]{
    _id,
    title,
    menulinks[]
  }
}
`;
