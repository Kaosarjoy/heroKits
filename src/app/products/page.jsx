import ProductPage from '@/components/home/ProductPage';
import React from 'react';

export const metadata = {
  title: "All Products",
  description: "Browse all fun, safe and educational toys available at Hero Kids.",

  openGraph: {
    title: "All Products | Hero Kids",
    description: "Explore a wide range of toys and learning products for kids.",
    url: "https://your-vercel-domain.vercel.app/products",
    images: [
      {
        url: "/products-og.png", // আলাদা image দিলে best
        width: 1200,
        height: 630,
        alt: "Hero Kids Products",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "All Products | Hero Kids",
    description: "Check out all available toys for kids.",
    images: ["/products-og.png"],
  },
};

const Products = () => {
    return (
        <div>
            <ProductPage></ProductPage>
        </div>
    );
};

export default Products;
