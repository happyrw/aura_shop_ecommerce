"use client"
import Link from 'next/link';
import React from 'react'
import { AiOutlineShopping } from "react-icons/ai";
import Cart from './Cart';
import { useStateContext } from '@/context/stateContext';
import { UserButton } from '@clerk/nextjs';
import { SignedIn, SignedOut } from '@clerk/clerk-react';

const NavBar = () => {
    const { showCart, setShowCart, totalQuantities } = useStateContext();
    return (
        <div className='navbar-container'>
            <p className='logo'>
                <Link href="/">AURA&apos;s SHOP</Link>
            </p>
            <button type='button' className='cart-icon' onClick={() => setShowCart(true)}>
                <AiOutlineShopping />
                <span className='cart-item-gty'>{totalQuantities}</span>
            </button>
            <Link href="/ProductUploadForm">Upload</Link>
            {showCart && <Cart />}
            <SignedIn>
                <UserButton />
                <Link href="/admin">Admin</Link>
            </SignedIn>
            <SignedOut>
                <Link href="/sign-in">Login</Link>
                {/* <Link href="/auth/register">Register</Link> */}
            </SignedOut>
        </div>
    )
}

export default NavBar;