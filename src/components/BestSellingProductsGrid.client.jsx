import ProductCard from "./ProductCard.client"

export default function BestSellingProductGrid({products}){

    console.log(products)

    return(
        <div className="best-selling product-grid">
            {products ? (
                products.map((product)=>(
                    <ProductCard 
                        key ={product.id}
                        product={product} 
                    />
                ))
            ):(
                null
            )}            
        </div>
    )
}