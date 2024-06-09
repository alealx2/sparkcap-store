import { Link, Image, Money } from '@shopify/hydrogen';

export default function ProductSearchGrid({ products }) {

    
    return (
        <>
            {products.map((product, index) => (                  
                <div key={`${product.id}-wrap`}  className="product-grid-item">
                    <Link key={`${product.id}-item`}  to={`/products/${product.handle}`} className="image-container">
                    {product.media && (
                        product.media.nodes.map((img, i) => (
                            <Image 
                                key={img.id}
                                alt={img.altText != null ? img.altText : product.title} 
                                data={img.image} 
                            />
                        ))
                    )}
                    </Link>
                    <div className="product-grid-item-title">{product.title}</div>
                    <div className="product-grid-prices">
                        {/* <p>{product.variants?.nodes[0].price.amount}</p> */}
                        <Money withoutTrailingZeros data={product.variants?.nodes[0].price || {}} />
                        {product.variants?.nodes[0].compareAtPrice?.amount > product.variants?.nodes[0].price?.amount && (
                            <Money withoutTrailingZeros className="product-compare-at-price" data={product.variants?.nodes[0].compareAtPrice || {}} />
                        )}
                    </div>
                </div>
            ))}
        </>
    )
}