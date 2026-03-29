"use client";
import Image from "next/image";
import Link from "next/link";
import { FaStar, FaCartShopping } from "react-icons/fa6";
import CartButton from "../buttons/CartButton";

const ProductCard = ({ product }) => {

  const { title, image, price, ratings, reviews, sold, id } = product || {};

  return (
    <div className="card bg-base-100 shadow-md hover:shadow-xl transition">

      <figure className="p-4">
        <Image
          width={200}
          height={200}
          src={image}
          alt={title}
          className="rounded-xl h-40 object-cover"
        />
      </figure>

      <div className="card-body pt-0">
        <h2 className="card-title text-sm line-clamp-2">{title}</h2>

        {/* rating */}
        <div className="flex items-center gap-2 text-sm">
          <FaStar className="text-yellow-500" />
          <span>{ratings}</span>
          <span className="text-gray-400">({reviews} reviews)</span>
        </div>

        {/* sold */}
        <p className="text-xs text-gray-500">{sold} sold</p>

        {/* price */}
        <p className="text-lg font-bold text-primary">৳{price}</p>


        {/* last section  */}
        <div className="flex gap-2 mt-2">
  <CartButton product={product} />

  <Link
    href={`/products/${product._id.toString()}`}
    className="btn btn-outline btn-sm flex-1"
  >
    View
  </Link>
</div>

      </div>
    </div>
  );
};

export default ProductCard;
