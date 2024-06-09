import { register } from 'swiper/element/bundle';
register()

import { Image, Link } from '@shopify/hydrogen';


export default function SwiperBanner({data}){

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
        >
              {data.map((element) =>(
                element.image ?  

                <swiper-slide key={element.id}>
                    <Link to={`/collections/${element.handle}`}>
                        <Image className='swiper-img' id={element.image.id} alt={`slide-${element.title}`} data={element.image}/>
                    </Link>
                </swiper-slide>                

                : null 
              ))}                

        </swiper-container>        
    )
}