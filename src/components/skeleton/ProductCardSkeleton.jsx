const ProductCardSkeleton = () => {
  return (
    <div className="card bg-base-100 shadow-md animate-pulse">

      <div className="p-4">
        <div className="h-40 bg-gray-300 rounded-xl"></div>
      </div>

      <div className="card-body pt-0 space-y-3">

        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
        <div className="h-4 bg-gray-300 rounded w-1/2"></div>

        <div className="flex items-center gap-2">
          <div className="h-4 w-4 bg-gray-300 rounded"></div>
          <div className="h-4 w-10 bg-gray-300 rounded"></div>
          <div className="h-4 w-20 bg-gray-300 rounded"></div>
        </div>

        <div className="h-3 bg-gray-300 rounded w-1/3"></div>

        <div className="h-5 bg-gray-300 rounded w-1/4"></div>

        <div className="flex gap-2 mt-2">
          <div className="h-8 bg-gray-300 rounded flex-1"></div>
          <div className="h-8 bg-gray-300 rounded flex-1"></div>
        </div>

      </div>
    </div>
  );
};

export default ProductCardSkeleton;