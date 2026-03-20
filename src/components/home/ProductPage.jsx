import React from "react";
import products from "@/data/toys.json";
import ProductCard from "../card/ProductCard";
import { getProduct } from "@/action/server/Product";

const ProductPage = async () => {
  
  const rawProducts = await getProduct() || [];

  // ডাটাকে সিরিয়ালাইজ বা ক্লিন করা
  const products = rawProducts.map(product => ({
    ...product,
    _id: product._id.toString(), // Buffer/ObjectId কে সাধারণ স্ট্রিং এ রূপান্তর
  }));

  return (
    <div>
      <h2 className="font-bold text-5xl mb-20 text-center">
        Our <span className="text-primary">Products</span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductPage;
