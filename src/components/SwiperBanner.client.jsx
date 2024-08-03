import { Image, Link } from '@shopify/hydrogen';
import { register } from 'swiper/element/bundle';
register()

import { fetchSanityData } from '../sanityData.client';
import { useState, useEffect } from 'react';


export default function SwiperBanner(){

    const [swiperData, setSanityData ] = useState(null);

    useEffect(() => {
        async function getData() {
          const sanityData = await fetchSanityData(sanityQuery);
          setSanityData(sanityData[0]);
        }
        getData();
      }, []);
    
    // console.log('swiper data')  
    // console.log(swiperData)
        

    return(
        <swiper-container
            slidesPerView="1"
            gridRows="1"
            mousewheelForceToAxis="true"
            navigation="true"
            pagination="true"      
            speed="500" 
            loop="true" 
            cssMode="true" 
            autoplay="true"                             
        >
            {swiperData ? (
                swiperData.hero.map((heroItem) => (
                    <swiper-slide key={heroItem.key}>
                        <Link to="/">
                            <Image 
                                className='swiper-img' 
                                id={`slide-${heroItem.key}`} 
                                alt={`slide-${heroItem.title}`} 
                                data={{
                                    altText: heroItem.title,
                                    url: heroItem.image.url,
                                    width: heroItem.image.metadata.dimensions.width,
                                    height: heroItem.image.metadata.dimensions.height,
                                }}                            
                            />

                            <div className='swiper-text'>
                                <h1>{heroItem.title}</h1>
                                <p>{heroItem.description}</p>
                            </div>
                        </Link>
                    </swiper-slide>  

                ))
            ) : (
                null
            )} 

        </swiper-container>        
    )
}

const sanityQuery = `
*[_type == "home"]{
    hero[]{
        "key": _key,
        title,
        description,    
      "image": content[0].image.asset->{
        _id,
        url,
        metadata { dimensions { width, height } }
      }    
    }
}
`;