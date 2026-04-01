"use client";
import { addToCart, deleteCartItem } from "@/action/server/cart"; // আপনার তৈরি করা অ্যাকশন
import Image from "next/image";
import React, { useState } from "react";
import { FaMinus, FaPlus, FaTrashCan } from "react-icons/fa6";
import Swal from "sweetalert2";

const CartItem = ({ item }) => {
   
  const [loading, setLoading] = useState(false);

  // quantity update করার জন্য ফাংশন, inc প্যারামিটার দিয়ে বোঝানো হচ্ছে quantity বাড়ানো হবে না কমানো হবে
  const handleUpdateQuantity = async (isIncrement) => {
    setLoading(true);
    // add to cart function কে quantity update করার জন্য কল করা হচ্ছে, inc প্যারামিটার দিয়ে বোঝানো হচ্ছে quantity বাড়ানো হবে না কমানো হবে
    const result = await addToCart({ product: { _id: item.productId }, inc: isIncrement });
    
    if (result.success) {
      //auto Refresh or update the cart item quantity in UI
      setLoading(false);
    } else {
      Swal.fire("Error", "Could not update quantity", "error");
      setLoading(false);
    }
  };
  //Remove cart item
  const handleRemoveCart = async()=>{
   Swal.fire({
  title: "Are you sure?",
  text: "You won't be able to revert this!",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Yes, Remove it !"
}).then(async (result) => {
    const deleteResult = await deleteCartItem(item._id);
    if(deleteResult.success){
        Swal.fire({
    title: "Deleted!",
    text: "Your cart has been deleted.",
    icon: "success"
  });
    }
    else{
        Swal.fire({
    title: "Error!",
    text: "Failed to delete cart item. Please try again.",
    icon: "error"
  });
        
    }
});

  }


  return (
    <div className="flex items-center justify-between bg-white p-4 mb-4 rounded-xl shadow-sm border border-gray-100 transition-all hover:shadow-md">
      {/* Image and Title */}
      <div className="flex items-center gap-4 flex-1">
        <div className="relative w-20 h-20 rounded-lg overflow-hidden border bg-gray-50">
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-contain p-2"
          />
        </div>
        <div>
          <h3 className="font-bold text-gray-800 text-lg line-clamp-1">{item.title}</h3>
          <p className="text-orange-600 font-semibold mt-1">৳{item.price}</p>
        </div>
      </div>

      {/* Quantity Control */}
      <div className="flex flex-col md:flex-row items-center gap-6">
        <div className="flex items-center border rounded-lg bg-gray-50 overflow-hidden">
          <button
            onClick={() => handleUpdateQuantity(false)}
            disabled={loading || item.quantity <= 1}
            className="p-2 hover:bg-gray-200 disabled:opacity-30 transition-colors"
          >
            <FaMinus size={12} />
          </button>
          
          <span className="px-4 font-bold text-gray-700 min-w-[40px] text-center">
            {item.quantity}
          </span>

          <button
            onClick={() => handleUpdateQuantity(true)}
            disabled={loading}
            className="p-2 hover:bg-gray-200 disabled:opacity-30 transition-colors"
          >
            <FaPlus size={12} />
          </button>
        </div>

        {/* Total Price */}
        <div className="hidden md:block  min-width: 100px; text-right">
          <p className="text-sm text-gray-400">Total</p>
          <p className="font-bold text-gray-800">৳{item.price * item.quantity}</p>
        </div>

        {/* Remove Item Button */}
        <button 
        onClick={handleRemoveCart}
          className="btn btn-ghost btn-circle text-red-500 hover:bg-red-50 hover:text-red-600"
          title="Remove Item"
        >
          <FaTrashCan size={18} />
        </button>
      </div>
    </div>
  );
};

export default CartItem;