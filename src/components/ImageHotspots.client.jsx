import { useState, useEffect } from "react";
import { fetchSanityData } from "../sanityData.client";
import { TagIcon } from "@heroicons/react/16/solid";
import { Link } from "@shopify/hydrogen";

export default function ImageHotspots(){

    const [hotspotData, setSanityData ] = useState([]);
    const [hoveredHotspotId, setHoveredHotspotId] = useState(null);
    const [hoveredLinkId, setHoveredLinkId] = useState(null);

    useEffect(() => {
        async function getData() {
          const sanityData = await fetchSanityData(sanityQuery);
          setSanityData(sanityData[0].productHotspot);
        }
        getData();
      }, []);
    
    // console.log('hotspot data')  
    // console.log(hotspotData)


    return(
      <>
            {hotspotData ? (
                hotspotData.map((hotspot) => (
                    <div key={hotspot.key} className="image-wrapper">
                        <img className="hotspot-img" src={hotspot.imageUrl}/>
                        <div className='hotspot-text'>
                          <h2>{hotspot.text}</h2>
                        </div>             

                        {hotspot.showHotspots && hotspot.productHotspots && (
                            <div className="hotspots">
                                {hotspot.productHotspots.map((spot) => (
                                    <div
                                        key={spot.key}
                                        className='hotspot'
                                        style={{
                                            position: 'relative',
                                            top: `${spot.y}%`,
                                            left: `${spot.x}%`,
                                        }}
                                        onMouseEnter={() => setHoveredHotspotId(spot.key)}
                                        onMouseLeave={(e) => {
                                            if (!e.currentTarget.contains(e.relatedTarget)) {
                                                setHoveredHotspotId(null);
                                            }
                                        }}                                        
                                    >
                                        <TagIcon 
                                          key={`tag-${spot.key}`}
                                          alt={spot.productWithVariant.product.title}
                                          title={spot.productWithVariant.product.title}                                        
                                        />
                                        {(hoveredHotspotId === spot.key || hoveredLinkId === spot.key) && (
                                          <Link  
                                          className={`hotspot-icon prd-${spot.key}`} 
                                          to={`/products/${spot.productWithVariant.product.slug}`}
                                          onMouseEnter={() => setHoveredLinkId(spot.key)}
                                          onMouseLeave={(e) => {
                                              if (!e.currentTarget.contains(e.relatedTarget)) {
                                                  setHoveredLinkId(null);
                                              }
                                          }}                                          
                                          >
                                            <div className="hotspot-product">
                                              <img src={spot.productWithVariant.product.image}></img>
                                              <div className="hotspot-product-info">
                                                <span>{spot.productWithVariant.product.title}</span>
                                                <span>CLP {spot.productWithVariant.product.price}</span>
                                              </div>
                                            </div>
                                          </Link>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))
            ) : (
                null
            )}
      </>
    )
}

const sanityQuery = `
*[_type == "home"]{
  productHotspot[]{
    "key": _key,
    text,
    "imageUrl": image.asset->url,
    showHotspots,
    productHotspots[]{
      "key": _key,
      x,
      y,
      productWithVariant{
        product->{
          _id,
          "title": store.title,
          "slug": store.slug.current,
          "image": store.previewImageUrl,
          "price": store.priceRange.minVariantPrice
        },
        variant->{
          "title": store.title,
          "image": store.previewImageUrl,
          "price": store.priceRange.minVariantPrice
        }
      }
    }
  }
}
`;