import { getCartItems } from '@/action/server/cart';
import CartItem from '@/components/card/CartItem';
import React from 'react';
import { FaShoppingBasket } from 'react-icons/fa'; 

const CartPage = async () => {
    const cartItems = await getCartItems();

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-2xl font-bold mb-6">Your Shopping Bag ({cartItems?.length})</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* আইটেম লিস্ট */}
                <div className="lg:col-span-2">
                    {cartItems?.length > 0 ? (
                        cartItems.map((item) => (
                            <CartItem key={item._id} item={item} />
                        ))
                    ) : (
                        <p>No items in cart</p>
                    )}
                </div>

                {/* Order Summary */}
                <div className="bg-white p-6 rounded-xl shadow-sm border h-fit">
                    <h3 className="font-bold text-xl mb-4">Order Summary</h3>
                    {/* Total Price */}
                    <button className="btn btn-primary w-full mt-4">Proceed to Checkout</button>
                </div>
            </div>
        </div>
    );
};

export default CartPage;