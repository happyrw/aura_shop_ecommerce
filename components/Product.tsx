import { urlFor } from '@/lib/client'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { ProductProduct } from './ProductDetailComponent'

const Product = ({ product }: { product: ProductProduct }) => {
    return (
        <>
            {product.image && (
                <div>
                    <Link href={`/product/${product._id}`}>
                        <div className="product-card">
                            {product.image && (
                                <Image
                                    src={urlFor(product.image && product.image[0]).url()}
                                    alt=''
                                    width={250}
                                    height={250}
                                    className='product-image'
                                />
                            )}
                            <p className="product-name">{product.name}</p>
                            <p className="product-name">${product.price}</p>
                        </div>
                    </Link>
                </div>

            )}
        </>
    )
}

export default Product;