'use client';
import { useStateContext } from '@/context/stateContext'
import { RunFireworks } from '@/lib/run-fireworks';
import Link from 'next/link';
import React, { useEffect } from 'react'
import { BsBagCheckFill } from "react-icons/bs";

const SuccessPage = () => {
    const { setCartItems, setTotalPrice, setTotalQuantities } = useStateContext();

    useEffect(() => {
        localStorage.clear();
        setCartItems([]);
        setTotalPrice(0);
        setTotalQuantities(0);
        RunFireworks();
    }, []);

    return (
        <div className='success-wrapper'>
            <div className="success">
                <p className="icon">
                    <BsBagCheckFill />
                </p>
                <h2>Thank you for your order!</h2>
                <p className="email-msg">Check your email inbox for the receipt</p>
                <p className="description">
                    If you have any questions, please email <a href="mailto:happy222004567@gmail.com">
                        happy222004567@gmail.com
                    </a>
                </p>
                <Link href="/">
                    <button type="button" className='w-[300px] btn'>Continue Shopping</button>
                </Link>
            </div>
        </div>
    )
}

export default SuccessPage;