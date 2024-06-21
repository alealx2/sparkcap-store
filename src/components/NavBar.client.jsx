import { Link } from '@shopify/hydrogen';
import { fetchSanityData } from '../sanityData.client';
import { useEffect, useState } from 'react';

export default function NavBar({collections}){

  const sanityQuery = `
    *[_type == "megaMenu"]{
      _id,
      title,
      mainlink,
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
  `;

    const [navigationData, setSanityData] = useState([]);
  
    useEffect(() => {
      async function getData() {
        const sanityData = await fetchSanityData(sanityQuery);
        setSanityData(sanityData);
      }
      getData();
    }, []);
  
    console.log('Mega menu data:')
    console.log(navigationData)

    return (
      <div className="customNavbar">
        <div className='mainMenu'>
          <ul>
            {navigationData.map((menu) => (
              <li key={menu._id}>
                {menu.title}
              </li>
            ))}
          </ul>
        </div>
  
        <div className='subMenu'>
          {navigationData.map((menu) => (
            <div className='wrap' key={menu._id} >
              <ul>
                {menu.collectionLinks && menu.collectionLinks.map((collection) => (
                  <li key={collection._id}>
                    <a href={`/collections/${collection.slug}`}>{collection.title}</a>
                  </li>
                ))}
                {menu.customLink && (
                  <li>
                    <a href={menu.customUrl}>{menu.customLink}</a>
                  </li>
                )}
              </ul>
              {menu.images && (
                <div className="menuImages">
                  {menu.images.map((image) => (
                    <img key={image._key} src={image.url} alt="" />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
}

