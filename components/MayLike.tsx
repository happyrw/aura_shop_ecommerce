import React from 'react'
import { ProductProduct } from './ProductDetailComponent'
import Product from './Product'

const MayLike = ({ products }: { products: ProductProduct[] }) => {
    return (
        <div className="maylike-products-container">
            {products.map((product, index) => (
                <Product key={index} product={product} />
            ))}
        </div>
    )
}

export default MayLike;