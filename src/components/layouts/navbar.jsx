import React from 'react';
import Logo from './Logo';
import Navlink from '../buttons/Navlink';
import Link from 'next/link';
import { FaCartShopping } from "react-icons/fa6";
import AuthButton from '../buttons/AuthButton';
import { CgProfile } from 'react-icons/cg';

const Navbar = () => {
    const nav = (
        <>
            <li><Navlink href="/">Home</Navlink></li>
            <li><Navlink href="/products">Products</Navlink></li>
            <li><Navlink href="/blog">Blog</Navlink></li>
            <li><Navlink href="/contact">Contact</Navlink></li>
        </>
    );

    return (
        <div className="navbar bg-base-100 px-2 sm:px-4 shadow-sm">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden p-1 mr-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[50] mt-3 w-52 p-2 shadow-xl border border-base-200">
                        {nav}
                    </ul>
                </div>
                <Logo />
            </div>

            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 gap-2">
                    {nav}
                </ul>
            </div>

            <div className="navbar-end flex items-center gap-1 sm:gap-3">
                {/* Profile Icon Button - Mobile এ ছোট এবং Desktop এ বড় করার জন্য */}
                <Link href="/profile" className="btn btn-ghost btn-circle btn-sm sm:btn-md hover:bg-primary hover:text-white transition-colors">
                    <CgProfile className="text-xl sm:text-2xl" />
                </Link>

                {/* Cart Icon Button */}
                <Link href="/cart" className="btn btn-ghost btn-circle btn-sm sm:btn-md hover:bg-primary hover:text-white transition-colors">
                    <FaCartShopping className="text-lg sm:text-xl" />
                </Link>

                {/* Auth Button - Mobile এ ছোট দেখানোর জন্য */}
                <div className="scale-90 sm:scale-100 origin-right">
                    <AuthButton />
                </div>
            </div>
        </div>
    );
};

export default Navbar;