"use client";

import Image from "next/image";
import { FaStar, FaCartShopping } from "react-icons/fa6";

const ProductViewDetails = ({ product }) => {
  if (!product) return <p>Product not found</p>;

  const {
    title,
    bangla,
    image,
    price,
    discount,
    description,
    ratings,
    reviews,
    sold,
    info,
  } = product;

  const discountedPrice = price - (price * discount) / 100;

  return (
    <div className="max-w-6xl mx-auto p-4 md:flex gap-8">
      
      {/* Image Section */}
      <div className="flex-1">
        <Image
          src={image}
          alt={title}
          width={400}
          height={400}
          className="rounded-xl object-cover w-full h-[400px]"
        />
      </div>

      {/* Details Section */}
      <div className="flex-1 flex flex-col gap-4">
        
        {/* Title */}
        <h1 className="text-2xl font-bold line-clamp-2">{title}</h1>
        <h2 className="text-gray-600">{bangla}</h2>

        {/* Rating */}
        <div className="flex items-center gap-2 text-sm text-gray-700">
          <FaStar className="text-yellow-500" />
          <span>{ratings}</span>
          <span>({reviews} reviews)</span>
          <span className="ml-auto text-gray-400">{sold} sold</span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold text-primary">
            ৳{discountedPrice}
          </span>
          {discount > 0 && (
            <span className="line-through text-gray-400">৳{price}</span>
          )}
        </div>

        {/* Info bullets */}
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          {info?.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>

        {/* Description */}
        <div className="text-gray-600 mt-2 whitespace-pre-line">
          {description}
        </div>

        {/* Buttons */}
        <div className="flex gap-4 mt-4">
          <button className="btn btn-primary flex-1 flex items-center justify-center gap-2">
            <FaCartShopping />
            Add to Cart
          </button>
          <button className="btn btn-outline flex-1">Buy Now</button>
        </div>

      </div>
    </div>
  );
};

export default ProductViewDetails;