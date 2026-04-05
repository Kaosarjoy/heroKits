"use server";
import { authOptions } from "@/app/lib/authOption";
import { collections, dbConnect } from "@/app/lib/dbconnect";
import { getServerSession } from "next-auth";
import { clearCart, getCartItems } from "./cart";
import { revalidatePath } from "next/cache";

export const createOrder = async (payload) => {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user)
      return { success: false, message: "Please login first" };

    const orderCollection = await dbConnect(collections.ORDER);
    const cartCollection = await dbConnect(collections.CART);

    const cart = await getCartItems();
    if (cart.length === 0) return { success: false, message: "Cart is empty" };

    const newOrder = {
      userId: session.user.email, //email deya id niya r jono
      items: cart,
      status: "pending", //default status
      createdAt: new Date(),
      ...payload,
    };

    const result = await orderCollection.insertOne(newOrder);

if (result.insertedId) {
    const newOrderId = result.insertedId.toString(); 
    
    await clearCart(); 
    revalidatePath("/cart");

    return { 
        success: true, 
        orderId: newOrderId, 
        message: "Order created successfully" 
    };
}

    return { success: false, message: "Database insertion failed" };
  } catch (error) {
    return { success: false, message: error.message };
  }
};
