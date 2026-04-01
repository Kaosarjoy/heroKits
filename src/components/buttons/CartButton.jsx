"use client";
import { addToCart } from "@/action/server/cart";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import { FaCartShopping } from "react-icons/fa6";
import Swal from "sweetalert2";

const CartButton = ({ product }) => {
 const { data: session, status } = useSession();
  const router = useRouter();
  const path = usePathname();
 const [loading, setLoading] = useState(false);
  const handleAddToCart =async () => {
    //check the user is login or not 
     setLoading(true);
    if(session?.user){
      const result = await addToCart({product , inc : true});
     
      if(result.success){
        Swal.fire({
          icon: "success",
          title: `Added : ${product.title}`,
          text: result.message,
        })
      }
      else{
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to add product to cart. Please try again.",
        })
       
      } setLoading(false)
      // ekhane apnar cart e add korar logic likhben
    }else{
      // login na thakle login page e pathabe
      router.push(`/login?callbackUrl=${path}`);
      setLoading(false);
    }
  };

  return (
    <button
  // 'loading' ট্রু হওয়ার সাথে সাথেই বাটন ডিজেবল হবে
  disabled={status === "loading" || loading}
  onClick={handleAddToCart}
  className={`btn btn-primary btn-sm gap-2 flex-1 ${
    loading ? "pointer-events-none opacity-70" : ""
  }`}
>
  {loading ? (
    <>
      <span className="loading loading-spinner loading-xs"></span>
      Adding...
    </>
  ) : (
    <>
      <FaCartShopping />
      Add to Cart
    </>
  )}
</button>
  );
};

export default CartButton;


