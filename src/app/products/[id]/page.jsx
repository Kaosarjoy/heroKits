import { getSingleProduct } from '@/action/server/Product';
import ProductViewDetails from '@/components/card/ProductViewDetails';


const ProductPage = async ({ params }) => {
  // ১. Next.js 15 হলে params await করতে হবে
  const { id } = await params; 

  // ২. ডাটা ফেচ করুন
  const product = await getSingleProduct({ id });

  // ৩. চেক করুন ডাটা আসলো কি না
  if (!product) {
    return (
      <div className="text-center py-20">
        <h1 className="text-2xl font-bold">Product not found!</h1>
        <p>ID: {id}</p>
      </div>
    );
  }

  return <ProductViewDetails product={product} />;
};

export default ProductPage;

