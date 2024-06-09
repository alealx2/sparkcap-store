import { register } from 'swiper/element/bundle';
register()

import { Image, Link } from '@shopify/hydrogen';


export default function ProductGallery({product}){

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
              {product.map((data) =>(
                data.image ?  

                <swiper-slide key={data.id}>
                    <Link to={`/products/${data.handle}`}>
                        <Image className='swiper-img' id={data.image.id} alt={data.image.altText} data={data.image}/>
                    </Link>
                </swiper-slide>                

                : null 
              ))}                

        </swiper-container>        
    )
}