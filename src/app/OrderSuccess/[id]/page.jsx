import Link from 'next/link';
import React from 'react';
import { FaCircleCheck } from 'react-icons/fa6';

const OrderSuccess = async ({ params }) => {
    // order id ta params theke niya order details dekha 
    const { id } = await params; 
    const orderId = id;
    // console.log("Order ID:", orderId); 
    return (
        <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 px-4">
            <div className="max-w-md w-full bg-white p-8 rounded-3xl shadow-xl text-center border border-gray-100">
                
                {/* success icon animation */}
                <div className="flex justify-center mb-6">
                    <div className="bg-green-100 p-4 rounded-full animate-bounce">
                        <FaCircleCheck className="text-green-500 text-6xl" />
                    </div>
                </div>

                {/* main message */}
                <h1 className="text-3xl font-extrabold text-gray-800 mb-2">
                    Order Successful! 🥳
                </h1>
                <p className="text-gray-500 mb-6">
                    Thank you for shopping with <span className="font-bold text-primary">Hero Kids</span>. 
                    Your little ones will love their new toys!
                </p>

                {/* order details card */}
                <div className="bg-orange-50 border border-orange-100 rounded-2xl p-4 mb-8">
                    <p className="text-sm text-gray-600 mb-1">Order ID:</p>
                    <p className="font-mono font-bold text-gray-800 break-all">
                        #{orderId || "N/A"}
                    </p>
                </div>

                {/* action buttons */}
                <div className="space-y-3">
                    <Link 
                        href="/" 
                        className="btn btn-primary w-full rounded-xl text-white font-bold py-3 shadow-lg shadow-primary/20"
                    >
                        Continue Shopping
                    </Link>
                    
                    <Link 
                        href="/my-orders" 
                        className="btn btn-ghost w-full text-gray-500 hover:text-primary transition-colors"
                    >
                        Track My Orders
                    </Link>
                </div>

                <div className="mt-8 pt-6 border-t border-dashed text-xs text-gray-400">
                    A confirmation email has been sent to your inbox.
                </div>
            </div>
        </div>
    );
};

export default OrderSuccess;