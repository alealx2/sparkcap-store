import { Link, Image, Money } from '@shopify/hydrogen';

export default function ProductCard({ product }) {

    const { price: price, compareAtPrice: compareAtPrice} = product.variants?.nodes[0] || {};

    const isDiscounted = compareAtPrice?.amount > price?.amount;

    const imgAlttext = product.featuredImage.altText != null ? product.featuredImage.altText : product.title;

    return (
        <div className="product-grid-item">
            <Link to={`/products/${product.handle}`} className="image-container">
                <Image 
                    key={product.featuredImage.id} 
                    alt={imgAlttext} 
                    data={product.featuredImage} 
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
    )
}