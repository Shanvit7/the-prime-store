const Skeleton = () => {
  return (
    <div className="min-w-56 max-w-xs h-96 bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden flex flex-col">
      {/* Image placeholder */}
      <div className="relative h-48 bg-gray-300 dark:bg-gray-700 animate-pulse">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-600 to-transparent animate-shimmer"></div>
      </div>

      {/* Content area */}
      <div className="p-4 flex flex-col flex-grow bg-white border-t border-gray-200 rounded-b-lg">
        {/* Title */}
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded-md animate-pulse w-3/4 mb-2"></div>

        {/* Variant Circles */}
        <div className="py-2 flex space-x-2 overflow-x-auto">
          {[...Array(4)].map((_, index) => (
            <div
              key={index}
              className="w-8 h-8 bg-gray-300 dark:bg-gray-700 rounded-full animate-pulse"
            ></div>
          ))}
        </div>

        {/* Price and Button */}
        <div className="flex flex-col mt-auto">
          {/* Price */}
          <div className="h-5 bg-gray-300 dark:bg-gray-700 rounded-md animate-pulse w-1/4 mb-2"></div>

          {/* Button */}
          <div className="h-10 bg-yellow-200 dark:bg-yellow-700 rounded-md animate-pulse w-1/2"></div>
        </div>
      </div>
    </div>
  );
};

const SkeletonProductGrid = () => {
  return (
    <div data-cy="product-loading-skeleton" className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-8">
      {[...Array(9)].map((_, index) => (
        <Skeleton key={index} />
      ))}
    </div>
  );
};


const ProductSkeleton = () => (
    <main className="w-svw px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 animate-pulse">
      <section className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/2 relative">
            <div className="bg-gray-300 h-64 md:h-full"></div>
          </div>
          
          <div className="md:w-1/2 p-6">
            <div className="h-8 bg-gray-300 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-300 rounded w-1/4 mb-4"></div>
            <div className="flex items-center mb-4">
              <div className="h-4 bg-gray-300 rounded w-24 mr-2"></div>
              <div className="h-4 bg-gray-300 rounded w-8"></div>
            </div>
            <div className="h-6 bg-gray-300 rounded w-1/4 mb-4"></div>
            <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-3/4 mb-4"></div>
            <div className="h-10 bg-gray-300 rounded w-1/2"></div>
          </div>
        </div>
      </section>
      
      <section className="mt-8">
        <div className="h-8 bg-gray-300 rounded w-1/4 mb-4"></div>
        <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
        <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
      </section>
      
      <section className="mt-8">
        <div className="h-8 bg-gray-300 rounded w-1/4 mb-4"></div>
        <div className="space-y-4">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="flex items-start space-x-4">
              <div className="h-10 w-10 bg-gray-300 rounded-full"></div>
              <div className="flex-1">
                <div className="h-4 bg-gray-300 rounded w-1/4 mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-3/4"></div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
);

export { SkeletonProductGrid, ProductSkeleton };
