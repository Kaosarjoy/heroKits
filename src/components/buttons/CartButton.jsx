"use client";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { FaCartShopping } from "react-icons/fa6";

const CartButton = ({ product }) => {
  const login = false;
  const router = useRouter();
  const path = usePathname();
  const isLogin = () => {
    if (login) alert(product._id);
    else router.push(`/login?callbackUrl=${path}`);
  };

  return (
    <button onClick={isLogin} className="btn btn-primary btn-sm gap-2 flex-1">
      <FaCartShopping />
      Add to Cart
    </button>
  );
};

export default CartButton;
