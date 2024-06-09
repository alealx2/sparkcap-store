import { Link } from "@shopify/hydrogen";

import FooterNavBar from "./FooterNavBar.client";

export default function Footer({collections}){
    return(
        <div className="footer-links">
            {collections.map((collection) =>(
                <FooterNavBar collections={collections}/>
            ))}              
        </div>
    )
}