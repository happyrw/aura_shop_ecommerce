"use client";
import { useStateContext } from '@/context/stateContext';
import { urlFor } from '@/lib/client';
import getStripe from '@/lib/getStripe';
import Image from 'next/image';
import Link from 'next/link';
import React, { useRef } from 'react'
import toast from 'react-hot-toast';
import { AiOutlineLeft, AiOutlineMinus, AiOutlinePlus, AiOutlineShopping } from 'react-icons/ai';
import { TiDeleteOutline } from 'react-icons/ti';

export interface CartItemCart {
    _id: string;
    name: string;
    price: number;
    quantity: number;
    image?: string[];
    [key: string]: string | string[] | number | boolean | undefined;
}

const Cart = () => {
    const cartRef = useRef<HTMLDivElement>(null);
    const { totalPrice, totalQuantities, cartItems, setShowCart, toggleCartItemQuantity, onRemove } = useStateContext();

    const handleCheckOut = async () => {
        const stripe = await getStripe();

        try {
            const response = await fetch("/api/stripe", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(cartItems),
            });

            if (response.status === 500) {
                toast.error('Server error');
                return;
            }

            if (!response.ok) {
                toast.error('Failed to process checkout');
                return;
            }

            const data = await response.json();

            if (!data || !data.id) {
                toast.error('Invalid data from server');
                return;
            }

            toast.loading('Redirecting...');
            stripe.redirectToCheckout({ sessionId: data.id });
        } catch (error) {
            console.error("Checkout Error:", error);
            toast.error('An error occurred during checkout');
        }
    };

    return (
        <div className='cart-wrapper' ref={cartRef}>
            <div className="cart-container">
                <button
                    type="button"
                    className='cart-heading'
                    onClick={() => setShowCart(false)}
                >
                    <AiOutlineLeft />
                    <span className="heading">Your Cart</span>
                    <span className="cart-num-items">({totalQuantities} items)</span>
                </button>

                {cartItems.length < 1 && (
                    <div className="empty-cart">
                        <AiOutlineShopping size={150} />
                        <h3>Your shopping bag is empty</h3>
                        <Link href="/">
                            <button
                                type="button"
                                onClick={() => setShowCart(false)}
                                className='btn'
                            >
                                Continue Shopping
                            </button>
                        </Link>
                    </div>
                )}

                <div className="product-container">
                    {cartItems.map((item: CartItemCart) => (
                        <div className="product" key={item._id}>

                            {item.image && item.image[0] ? (
                                <Image
                                    src={urlFor(item.image[0]).url()}
                                    alt={item.name || "Product image"}
                                    width={500}
                                    height={500}
                                    className="cart-product-image"
                                />
                            ) : (
                                <div className="fallback-image">No Image Available</div>
                            )}

                            <div className="item-desc">
                                <div className="flex top">
                                    <h5>{item.name}</h5>
                                    <h4>${item.price}</h4>
                                </div>
                                <div className="flex bottom">
                                    <div>
                                        <p className="quantity-desc">
                                            <span className="minus" onClick={() => toggleCartItemQuantity(item._id, 'dec')}>
                                                <AiOutlineMinus />
                                            </span>
                                            <span className="num">
                                                {item.quantity}
                                            </span>
                                            <span className="plus" onClick={() => toggleCartItemQuantity(item._id, 'inc')}>
                                                <AiOutlinePlus />
                                            </span>
                                        </p>
                                    </div>
                                    <button type='button' className='remove-item' onClick={() => onRemove(item)}>
                                        <TiDeleteOutline />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}               </div>
                {cartItems.length >= 1 && (
                    <div className="cart-bottom">
                        <div className="total">
                            <h3>Subtotal:</h3>
                            <h3>${totalPrice}</h3>
                        </div>
                        <div className="btn-container">
                            <button type='button' className='btn' onClick={handleCheckOut}>
                                Pay with Stripe
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Cart;