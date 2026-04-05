"use client";
import { addToCart, deleteCartItem } from "@/action/server/cart"; // আপনার তৈরি করা অ্যাকশন
import Image from "next/image";
import React, { useState } from "react";
import { FaMinus, FaPlus, FaTrashCan } from "react-icons/fa6";
import Swal from "sweetalert2";

const CartItem = ({ item , removeItem , incrementQuantity , decrementQuantity }) => {
   
  const [loading, setLoading] = useState(false);

  
  //Quantity barano jono 
  const handleIncrementQuantity = async()=>{
    const result = await incrementQuantity(item._id, item.quantity);
    if(result.success){
      Swal.fire({
        title: "Success!",
  icon: "success",
  draggable: true
      })
    }
    else{
      Swal.fire({
        title: "Error!",
  text: "Failed to update quantity. Please try again.",
    icon: "error"
      })
    }
  }



  //Quantity Komanor  jono 
  const handleRemoveQuantity = async () => {
    setLoading(true);
    const result = await decrementQuantity(item._id, item.quantity);
    
    if(result.success){
      Swal.fire({
        title: "Success!",
     icon: "success",
    draggable: true
      })
    }
    else{
      Swal.fire({
        title: "Error!",
  text: "Failed to update quantity. Please try again.",
    }
      )
    }

     setLoading(false);

  };


  //Remove cart item
  const handleRemoveCart = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Remove it!"
    }).then(async (result) => {
      // এই কন্ডিশনটি যুক্ত করা হয়েছে
      if (result.isConfirmed) {
        setLoading(true); // লোডিং শুরু
        const deleteResult = await deleteCartItem(item._id);
        
        if (deleteResult.success) {
          removeItem(item._id);
          Swal.fire({
            title: "Deleted!",
            text: "Your cart item has been deleted.",
            icon: "success"
          });
        } else {
          Swal.fire({
            title: "Error!",
            text: "Failed to delete cart item. Please try again.",
            icon: "error"
          });
        }
        setLoading(false); // লোডিং শেষ
      }
    });
  };


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
            onClick={() => handleRemoveQuantity(item._id)}
            disabled={loading || item.quantity <= 1}
            className="p-2 hover:bg-gray-200 disabled:opacity-30 transition-colors"
          >
            <FaMinus size={12} />
          </button>
          
          <span className="px-4 font-bold text-gray-700 min-width-[40px] text-center">
            {item.quantity}
          </span>

          <button
            onClick={() => handleIncrementQuantity(item._id)}
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
          disabled={loading}
        >
          <FaTrashCan size={18} />
        </button>
      </div>
    </div>
  );
};

export default CartItem;