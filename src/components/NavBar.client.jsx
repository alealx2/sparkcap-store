import { Link } from '@shopify/hydrogen';
import FloatingMenu from './FloatingMenu.client';

export default function NavBar({collections}){
    return (
        <ul className="header-navigation">
            <li><a href="/catalog">Catalog</a></li>
            <li>
                <FloatingMenu menu={collections}/>
            </li>
            <li><a href="/blog">Blog</a></li>
        </ul>        
    )
}

