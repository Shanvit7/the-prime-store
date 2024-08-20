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

const LoadingSkeletonGroup = () => {
  return (
    <div data-cy="product-loading-skeleton" className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-8">
      {[...Array(9)].map((_, index) => (
        <Skeleton key={index} />
      ))}
    </div>
  );
};

export default LoadingSkeletonGroup;
