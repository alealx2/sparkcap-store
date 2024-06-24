import { Link, Image, Money } from '@shopify/hydrogen';
import { useState } from 'react';

export default function ProductCard({ product }) {    
    const [isHovered, setIsHovered] = useState(false);

    const { price: price, compareAtPrice: compareAtPrice} = product.variants?.nodes[0] || {};
    const isDiscounted = compareAtPrice?.amount > price?.amount;
    const imgAlttext = product.featuredImage.altText != null ? product.featuredImage.altText : product.title;

    const firstImage = product.featuredImage;
    const secondImage = product.images?.edges[1]?.node || firstImage;
    const secondImgAlttext = secondImage.altText || product.title;

    return (
        <>
        {product ? (
                <div className="product-grid-item">
                <Link 
                    to={`/products/${product.handle}`} 
                    className="image-container"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}                   
                >
                    <Image 
                        key={isHovered ? secondImage.id : firstImage.id} 
                        alt={isHovered ? secondImgAlttext : imgAlttext} 
                        data={isHovered ? secondImage : firstImage} 
                        className="product-image"
                    />
                </Link>
                <div className="product-grid-item-title">{product.title}</div>
                <div className="product-grid-prices">
                    <Money withoutTrailingZeros data={price} />
                    {isDiscounted && (
                        <Money withoutTrailingZeros className="product-compare-at-price" data={compareAtPrice} />
                    )}
                </div>
            </div>
        ):(
            null
        )}
        </>
    )
}