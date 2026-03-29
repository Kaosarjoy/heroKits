"use server";

import { dbConnect } from "@/app/lib/dbconnect"; 
import { ObjectId } from "mongodb";

// সব product fetch
export const getProduct = async () => {
  const collection = await dbConnect("products")
  const products = await collection.find().toArray();
  return products;
};

// single product fetch
export const getSingleProduct = async ({ id }) => {
  const collection = await dbConnect("products");

  const product = await collection.findOne({
    _id: new ObjectId(id),
  });

  if (!product) return null;

  return {
    ...product,
    _id: product._id.toString(), //  convert
  };
};



