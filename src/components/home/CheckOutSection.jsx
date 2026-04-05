"use client";
import React, { useState } from "react";
import Image from "next/image";
import { createOrder } from "@/action/server/Order";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

const CheckOutSection = ({ cartItems }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // shopping card er jonno fixed shopping cost deya holo
  const shipping = 100;

  // calculate subtotal and total
  const subtotal =
    cartItems?.reduce((acc, item) => acc + item.price * item.quantity, 0) || 0;
  const total = subtotal + shipping;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // 1. form er data gula collect kora
    const formData = new FormData(e.target);
    const orderData = {
      fullName: formData.get("fullName"),
      phone: formData.get("phone"),
      email: formData.get("email"),
      address: formData.get("address"),
      paymentMethod: formData.get("payment"),
      shippingFee: shipping,
      grandTotal: total,
    };

    // 2.server action call kora order create korar jonno
    const result = await createOrder(orderData);

    if (result.success) {
      Swal.fire("Success!", "Order placed successfully!", "success");
      router.push(`/OrderSuccess/${result.orderId}`); //success page e niye jabe order id shoho
    } else {
      Swal.fire("Error", result.message || "Failed to place order", "error");
    }
    setLoading(false);
  };

  return (
    <section className="bg-gray-50 min-h-screen py-10">
      <div className="container mx-auto px-4 max-w-6xl">
        <h2 className="text-3xl md:text-4xl py-4 font-bold border-l-8 border-primary pl-6 mb-10 bg-white shadow-sm rounded-r-lg">
          Check Out
        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8"
        >
          {/* Customer information */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-xl font-semibold mb-6 text-gray-800">
                Shipping Information
              </h3>

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Full Name
                    </label>
                    {/* fullName input */}
                    <input
                      name="fullName"
                      required
                      type="text"
                      placeholder="Enter your full name"
                      
                      className="w-full p-3 rounded-lg border border-gray-200 outline-none focus:border-primary"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Phone Number
                    </label>
                    <input
                      name="phone"
                      required
                      type="text"
                      placeholder="017XXXXXXXX"
                      className="w-full p-3 rounded-lg border border-gray-200 outline-none focus:border-primary"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Email Address
                  </label>
                  <input
                    name="email"
                    required
                    type="email"
                    placeholder="example@mail.com"
                   
                    className="w-full p-3 rounded-lg border border-gray-200 outline-none focus:border-primary"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Detailed Address
                  </label>
                  <textarea
                    name="address"
                    required
                    rows="3"
                    placeholder="House no, Area..."
                    className="w-full p-3 rounded-lg border border-gray-200 outline-none focus:border-primary"
                  ></textarea>
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-xl font-semibold mb-6 text-gray-800">
                Payment Method
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <label className="flex flex-col items-center gap-3 cursor-pointer border p-4 rounded-xl hover:bg-primary/5 has-[:checked]:border-primary has-[:checked]:bg-primary/5">
                  <input
                    type="radio"
                    name="payment"
                    value="COD"
                    className="hidden"
                    defaultChecked
                  />
                  <span className="text-sm font-bold text-gray-700">
                    Cash on Delivery
                  </span>
                </label>
                <label className="flex flex-col items-center gap-3 cursor-pointer border p-4 rounded-xl hover:bg-primary/5 has-[:checked]:border-primary has-[:checked]:bg-primary/5">
                  <input
                    type="radio"
                    name="payment"
                    value="Mobile Banking"
                    className="hidden"
                  />
                  <span className="text-sm font-bold text-gray-700">
                    bKash / Nagad
                  </span>
                </label>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-5">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 sticky top-24">
              <h3 className="text-xl font-semibold mb-6 text-gray-800 border-b pb-3">
                Order Summary
              </h3>

              <div className="max-h-64 overflow-y-auto mb-6 pr-2 space-y-4">
                {cartItems?.map((item) => (
                  <div key={item._id} className="flex gap-4 items-center">
                    <div className="relative w-14 h-14 rounded-lg border overflow-hidden flex-shrink-0 bg-gray-50">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-contain p-1"
                      />
                      <span className="absolute -top-1 -right-1 bg-primary text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-bold text-gray-800 line-clamp-1">
                        {item.title}
                      </h4>
                      <p className="text-xs text-gray-500">
                        ৳{item.price} x {item.quantity}
                      </p>
                    </div>
                    <p className="text-sm font-bold text-gray-800">
                      ৳{item.price * item.quantity}
                    </p>
                  </div>
                ))}
              </div>

              <div className="space-y-3 border-t pt-4">
                <div className="flex justify-between text-gray-600 italic">
                  <span>Subtotal</span>
                  <span>৳{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-600 italic">
                  <span>Shipping Fee</span>
                  <span>৳{shipping}</span>
                </div>
                <div className="flex justify-between text-xl font-bold text-gray-800 pt-2 border-t border-dashed">
                  <span>Total</span>
                  <span className="text-primary">
                    ৳{total.toLocaleString()}
                  </span>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-8 bg-primary hover:bg-orange-600 text-white font-bold py-4 rounded-xl transition-all shadow-lg disabled:bg-gray-400"
              >
                {loading
                  ? "Processing..."
                  : `Confirm Order ৳${total.toLocaleString()}`}
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default CheckOutSection;
