import { Link } from '@shopify/hydrogen';
import { fetchSanityData } from '../sanityData.client';
import { useEffect, useState } from 'react';

export default function NavBar() {

  const [navigationData, setSanityData] = useState([]);
  const [hoveredMenuId, setHoveredMenuId] = useState(null);

  useEffect(() => {
    async function getData() {
      const sanityData = await fetchSanityData(sanityQuery);
      setSanityData(sanityData);
    }
    getData();
  }, []);

  return (
    <div className="customNavbar">
      <div className='mainMenu'>
        <ul>
          {navigationData.map((menu) => (
            <li
              className={`menu-${menu._id}`}
              key={menu._id}
              onMouseEnter={() => setHoveredMenuId(menu._id)}
              onMouseLeave={(e) => {
                setTimeout(function(){
                    const submenu = document.querySelector(`.submenu-${menu.id}`);
                    const mainMenuItem = document.querySelector(`.menu-${menu.id}`);                  
                    if (
                      submenu && 
                      !submenu.contains(e.relatedTarget) && 
                      mainMenuItem && 
                      !mainMenuItem.contains(e.relatedTarget)
                    ) {
                      setHoveredMenuId(null);
                    }
                }, 300);
              }}
            >
              {menu.title}
                {hoveredMenuId === menu._id && (
                  <div 
                    className={`submenu-${menu._id} submenu`}
                    onMouseLeave={() => setHoveredMenuId(null)}               
                    >
                    <div className={`wrap`}>
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
                  </div>
                )}
            </li>
          ))}
          <li>
            <a href="/Blog">Blog</a>
          </li>
        </ul>
      </div>
    </div>
  );
}

const sanityQuery = `
*[_type == "megaMenu"]{
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
`;