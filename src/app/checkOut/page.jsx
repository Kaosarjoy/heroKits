import { getCartItems } from '@/action/server/cart';
import CheckOutSection from '@/components/home/CheckOutSection';
import React from 'react';

const CheckOut  =async () => {
    const cartItems = await getCartItems();
        const formattedCartItems = cartItems.map(item=>({...item, _id: item._id.toString()}))
    return (
        <div>
            <CheckOutSection cartItems={formattedCartItems}></CheckOutSection>
        </div>
    );
};

export default  CheckOut;