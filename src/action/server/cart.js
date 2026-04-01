"use server"

import { authOptions } from "@/app/lib/authOption";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { cache } from "react";

const { dbConnect } = require("@/app/lib/dbconnect")

const cartCollection = await dbConnect("cart");

export async function addToCart({product, inc = true}){

    const { user } =await getServerSession(authOptions) || {};
    if(!user)return {success:false}

    const query = {email : user.email, productId : product._id};

    const isAdded = await cartCollection.findOne(query);
    if(isAdded){
        //Is Exist, just update the quantity
        const updateData = {
            $inc : {
                quantity : inc ? 1 : -1
            }
            }
            const result = await cartCollection.updateOne(query, updateData);
            return {success : Boolean(result.modifiedCount)}
        }
    else{
        //Not Exist, create new cart item
        const newData = {
            email : user.email,
            productId : product._id,
            quantity : 1,
            title : product.title,
            image : product.image,
            price : product.price - (product.price * product.discount) / 100 ,
            userName : user.name 
        };
        const result = await cartCollection.insertOne(newData);
        return {success : Boolean(result.acknowledged)}
    }
    
    

    //console.log(user);
    
}

export const  getCartItems=cache(async ()=>{
     const { user } =await getServerSession(authOptions) || [];
    if(!user)return {success:false}

    const query = {email : user.email};

    const result = await cartCollection.find(query).toArray();
    return JSON.parse(JSON.stringify(result));
})

export const deleteCartItem = async(id)=>{
     const { user } =await getServerSession(authOptions) || [];
    if(!user)return {success:false}

    if(id.length !== 24) return {success:false}

    const query = {_id : new ObjectId(id)}

    const result = await cartCollection.deleteOne(query);

    if(Boolean(result.deletedCount)){
        revalidatePath("/cart");
    }
    return {success : Boolean(result.deletedCount)}
}