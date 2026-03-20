import ProductPage from '@/components/home/ProductPage';
import React from 'react';

export const metadata = {
  title: "All Products",
  description: "All products page of Hero Kids",
};

const Products = () => {
    return (
        <div>
            <ProductPage></ProductPage>
        </div>
    );
};

export default Products;
