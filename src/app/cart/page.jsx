import { getCartItems } from '@/action/server/cart';
import CartItem from '@/components/card/CartItem';
import CartSection from '@/components/home/CartSection';
import React from 'react';
import { FaShoppingBasket } from 'react-icons/fa'; 

const CartPage = async () => {
    const cartItems = await getCartItems();
    const formattedCartItems = cartItems.map(item=>({...item, _id: item._id.toString()}))
    console.log(formattedCartItems)

    return (
        <div className="container mx-auto px-4 py-8">
           
            
            <div>
                <CartSection cartItems={formattedCartItems}
                
                ></CartSection>
            </div>
        </div>
    );
};

export default CartPage;