import {
    ProductOptionsProvider,
    useProductOptions,
    Image,
    ProductPrice,
    AddToCartButton
} from '@shopify/hydrogen';
import { useState } from 'react';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import QuantitySelector from './custom/QuantitySelector.client';

export default function ProductDetails({ product }) {

    return (
        <ProductOptionsProvider data={product}>

            <div className="product-gallery">
                <div className='product-slides'>
                {product.media.nodes.map(({ image }) => (
                    <Zoom key={image.id}>
                        <Image                             
                            alt={image.altText}             
                            data={image} 
                            className="product-gallery-image"
                        />
                    </Zoom>
                ))}
                </div>
            </div>

            <ProductForm product={product}/>

        </ProductOptionsProvider>
    )
}

function ProductForm({ product }) {


    const { options, 
            selectedVariant, 
            selectedOptions, 
            setSelectedOption 
        } = useProductOptions();

    const isOutOfStock = !selectedVariant?.availableForSale || false;

    const [quantity, setQuantity] = useState(1);

    const handleQuantityChange = (newQuantity) => {
      setQuantity(newQuantity);
    };    

    return (
        <div className='product-page-item-info'>
            <div className='form__wrapper is-sticky with-sticky-header'>
                <h1 className='product-title'>{product.title}</h1>
                
                <span>Coupons and discounts are not available for this product</span>
                
                <ProductPrice 
                    className="product-page-price" 
                    withoutTrailingZeros
                    data={product}
                    variantId={selectedVariant.id}
                />
                
                <div className="product-options">
                    {options.map(({ name, values }) => {
                        if(values.length === 1) {
                            return null;
                        }
                        return (
                            <div key={name} className="product-option-group">
                                <legend className="product-option-name">
                                    {name}
                                </legend>
                                {values.map((value) => {
                                    const id = `option-${name}-${value}`;
                                    const checked = selectedOptions[name] === value;
                                    return (
                                        <div key={id} className="product-option-value">
                                            <input
                                                type="radio"
                                                checked={checked}
                                                name={name}
                                                value={value}
                                                id={id}
                                                onChange={() => setSelectedOption(name, value)}
                                            />
                                            <label htmlFor={id}>{value}</label>
                                        </div>
                                    )
                                })}
                            </div>
                        )
                    })}
                </div>

                {/* Qty selector */}
                <span>Quantity</span>
                <QuantitySelector min={1} max={selectedVariant.availableQuantity} onChange={handleQuantityChange} />
                
                {/* Atc btn */}       
                <AddToCartButton disabled={isOutOfStock} className="add-to-cart">
                    {isOutOfStock ? 'Out of stock' : 'Add to cart'}
                </AddToCartButton>

                {/* Desc */}
                <div className="product-description" dangerouslySetInnerHTML={{ __html: product.descriptionHtml}}></div>
            </div>
        </div>
    )
}