"use client";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { FaCartShopping } from "react-icons/fa6";

const CartButton = ({ product }) => {
  const {data : session} = useSession();
  const router = useRouter();
  const path = usePathname();
  const isLogin = () => {
    //check the user is login or not 
    if(session?.user){
      return alert("Product ID: "+ product?._id);
      // ekhane apnar cart e add korar logic likhben
    }else{
      // login na thakle login page e pathabe
      router.push(`/login?callbackUrl=${path}`);
    }
  };

  return (
    <button onClick={isLogin} className="btn btn-primary btn-sm gap-2 flex-1">
      <FaCartShopping />
      Add to Cart
    </button>
  );
};

export default CartButton;


