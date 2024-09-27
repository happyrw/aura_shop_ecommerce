"use client";
import Image from 'next/image';
import React, { useState } from 'react'
import { AiFillStar, AiOutlineMinus, AiOutlinePlus, AiOutlineStar } from 'react-icons/ai';
import { urlFor } from '@/lib/client';
import { useStateContext } from '@/context/stateContext';
import { Order } from '@stripe/stripe-js';
import { Review } from '@/sanity/schemaTypes/review';
import MayLike from './MayLike';

export interface ProductProduct {
    image: { _type: 'image'; asset: { _ref: string } }[];
    userId: string;
    postedBy: string;
    order: Order[];
    reviews: Review[];
    name: string;
    _id: string;
    slug: { _type: 'slug'; current: string };
    price: number;
    description: string;
    details: string;
    category: string;
    stock: number;
    SKU: string;
    isNewArrival: boolean;
    isDiscounted: boolean;
    discountPrice?: number;
    rating: number;
    createdAt: string;
}

export interface ProductType {
    _id: string;
    name: string;
    price: number;
    quantity?: number; // Optional if not all products have this field initially
    [key: string]: string | number | boolean | undefined; // Adjust types as needed
}

interface ProductProps {
    name: string,
    image: string[],
    price: string,
    details: string,
    product: ProductType,
    products: ProductProduct[],
}

const ProductDetailComponent = ({ name, image, price, details, product, products }: ProductProps) => {
    const [index, setIndex] = useState(0);

    const { incQty, decQty, qty, onAdd, setImageIndex, setShowCart } = useStateContext();

    const handleBuyNow = () => {
        onAdd(product, qty);
        setShowCart(true);
    }
    return (
        <>
            <div className="product-detail-container">
                <div>
                    <div className="image-container">
                        <Image
                            src={urlFor(image && image[index]).url()}
                            alt={name}
                            width={250}
                            height={250}
                            className='product-detail-image'
                        />
                    </div>
                    <div className="small-images-container">
                        {image?.map((item, i) => {
                            return (
                                <Image
                                    key={i}
                                    src={urlFor(item).url()}
                                    alt=""
                                    width={250}
                                    height={250}
                                    className={i === index ? 'small-image selected-image' : 'small-image'}
                                    onMouseEnter={() => {
                                        setIndex(i);
                                        setImageIndex(i);
                                    }}
                                />
                            )
                        })}
                    </div>
                </div>
                <div className="product-detail-desc">
                    <h1>{name}</h1>
                    <div className="reviews">
                        <div>
                            <AiFillStar />
                            <AiFillStar />
                            <AiFillStar />
                            <AiOutlineStar />
                        </div>
                        <p>(20)</p>
                    </div>
                    <h4>Details: </h4>
                    <p>{details}</p>
                    <p className="price">${price}</p>
                    <div className="quantity">
                        <h3>Quantity: </h3>
                        <p className="quantity-desc">
                            <span className="minus" onClick={decQty}>
                                <AiOutlineMinus />
                            </span>
                            <span className="num">
                                {qty}
                            </span>
                            <span className="minus" onClick={incQty}>
                                <AiOutlinePlus />
                            </span>
                        </p>
                    </div>
                    <div className="buttons">
                        <button className="add-to-cart" type="button" onClick={() => onAdd(product, qty)} >Add to Cart</button>
                        <button className="buy-now" type="button" onClick={handleBuyNow}>Buy Now</button>
                    </div>
                </div>
            </div>

            <div className="maylike-products-wrapper">
                <h2>You may also like</h2>
                <div className="marquee track">
                    <MayLike products={products} />
                </div>

            </div>
        </>
    )
}

export default ProductDetailComponent;