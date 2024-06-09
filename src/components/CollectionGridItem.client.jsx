import {Link, Image } from '@shopify/hydrogen';

export default function CollectionCard({collection}){

    const imgAlttext =collection.image.altText != null ?collection.image.altText : collection.title;

    return(
        <>
            <Link key={collection.id} to={`/collections/${collection.handle}`} >  
            <div className="collection-grid-item">
                <Image alt={imgAlttext} data={collection.image}/>
                <h3>{collection.title}</h3>
            </div>
            </Link>       
        </> 
    )
}