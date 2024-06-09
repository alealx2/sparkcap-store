import { Link } from '@shopify/hydrogen';

export default function FooterNavBar({collections}){
    return (
        <ul className="header-navigation">
            <li><a href="/catalog">Catalog</a></li>
            {collections.map((collection) =>(
                <li key={collection.id}>
                    <Link to={`/collections/${collection.handle}`} > {collection.title} </Link>                
                </li>
            ))}
            <li><a href="/blog">Blog</a></li>
        </ul>        
    )
}