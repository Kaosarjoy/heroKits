"use client"
import React, { useMemo, useState } from 'react';
import CartItem from '../card/CartItem';
import { decrementItems, incrementItems } from '@/action/server/cart';

const CartSection = ({ cartItems: initialItems = [] }) => {
    const [cartItems, setCartItems] = useState(initialItems);
    const totalItems = useMemo(() => cartItems.reduce((sum, item) => sum + item.quantity, 0), [cartItems]);
    const totalPrice = useMemo(() => cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0), [cartItems]);

    const removeItem = (id)=>{
        setCartItems(prevItems =>prevItems.filter(item=>item._id !==id))
    }

    const incrementQuantity = async (id, quantity) => {
    const result = await incrementItems(id, quantity);

    if(result?.success){
        setCartItems(prevItems =>
            prevItems.map(item =>
                item._id === id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            )
        );
    }

    return result;
};

    const decrementQuantity = async (id) => {
    const result = await decrementItems(id);

    if(result?.success){
        setCartItems(prevItems =>
            prevItems.map(item =>
                item._id === id && item.quantity > 1
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            )
        );
    }

    return result;
};

    return (
        <div className="container mx-auto px-4 py-8">
             <h2 className="text-2xl font-bold mb-6">Your Shopping Bag ({cartItems?.length})</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           
            <div className="lg:col-span-2 space-y-4">
                {cartItems && cartItems.length > 0 ? (
                    cartItems.map((item) => (
                        <CartItem key={item._id}
                         item={item} 
                         removeItem={removeItem}
                         incrementQuantity={incrementQuantity}
                         decrementQuantity={decrementQuantity} />
                    ))
                ) : (
                    <div className="bg-gray-50 p-10 rounded-xl text-center border-2 border-dashed">
                        <p className="text-gray-500 font-medium">Your shopping bag is empty</p>
                    </div>
                )}
            </div>

            {/* Styled Summary Box */}
            <div className='bg-white p-6 rounded-2xl shadow-md border border-gray-100 h-fit sticky top-24'>
  
  <h3 className="text-xl font-bold text-gray-800 mb-5 border-b pb-3">
    Order Summary
  </h3>

  {/* Summary Content */}
  <div className="space-y-4">

    <div className="flex justify-between text-gray-600">
      <span>Total Quantity</span>
      <span className="font-semibold text-gray-800">
        {totalItems} {totalItems > 1 ? 'Items' : 'Item'}
      </span>
    </div>

    <div className="flex justify-between text-gray-600">
      <span>Subtotal</span>
      <span className="font-semibold text-gray-800">
        ৳{totalPrice.toFixed(2)}
      </span>
    </div>

  

    <div className="border-t pt-4 flex justify-between items-center">
      <span className="text-lg font-bold text-gray-800">
        Total
      </span>
      <span className="text-xl font-bold text-primary">
        ৳{totalPrice.toFixed(2)}
      </span>
    </div>

  </div>

  {/* Confirm Button */}
  <button className="w-full mt-6 bg-primary hover:bg-primary/90 text-white font-semibold py-3 rounded-xl transition-all duration-200 shadow-md">
    Confirm Order
  </button>

  <p className="text-center text-xs text-gray-400 mt-3">
    Shipping & taxes calculated at checkout
  </p>

</div>
        </div>
        </div>
        
    );
};

export default CartSection;