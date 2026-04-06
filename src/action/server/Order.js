"use server";
import { authOptions } from "@/app/lib/authOption";
import { collections, dbConnect } from "@/app/lib/dbconnect";
import { getServerSession } from "next-auth";
import { clearCart, getCartItems } from "./cart";
import { revalidatePath } from "next/cache";
import { sendEmail } from "@/app/lib/sendEmail";
import { orderInvoiceTemplate } from "@/app/lib/orderInvoice";

export const createOrder = async (payload) => {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) return { success: false, message: "Please login first" };

    const orderCollection = await dbConnect(collections.ORDER);


    const cart = await getCartItems();
    if (cart.length === 0) return { success: false, message: "Cart is empty" };

    const newOrder = {
      userId: session.user.email,
      items: cart,
      status: "pending",
      createdAt: new Date(),
      ...payload,
    };

    const result = await orderCollection.insertOne(newOrder);

    if (result.insertedId) {
      const newOrderId = result.insertedId.toString();
      
      // 1.email send kor are jono data creae
      const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

      // 2. email send korar try catch block and return er agi lekh te hobe
      try {
        await sendEmail({
  to: session.user.email, 
  //onno email dile o hobe but user er email e send korle better hobe karon order invoice ta user ke dorkar pore jabe future reference er jono and user easily access korte parbe tar email theke. tai session.user.email use kora better hobe.
  // to: payload.email, 
  subject: "Your Order Invoice - Hero Kidz",
  html: orderInvoiceTemplate({
    orderId: newOrderId,
    items: cart,
    totalPrice: totalPrice + (payload.shippingFee || 0),
  }),
});
      } catch (emailError) {
        console.error("Email sending failed:", emailError);
        
      }

      //3. card clear and revalidate path
      await clearCart();
      revalidatePath("/cart");

      return {
        success: true,
        orderId: newOrderId,
        message: "Order created successfully",
      };
    }

    return { success: false, message: "Database insertion failed" };
  } catch (error) {
    return { success: false, message: error.message };
  }
};


export const getMyOrders = async () => {
     const { user } =await getServerSession(authOptions) || {};
    if(!user)return {success:false}


    const orderCollection = await dbConnect(collections.ORDER);
    
    const result = await orderCollection.find({ userId:user.email }).sort({ createdAt: -1 }).toArray();
    
    return JSON.parse(JSON.stringify(result));
};