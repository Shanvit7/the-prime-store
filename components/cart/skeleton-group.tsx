const CardSkeleton = () => {
  return (
    <li className="flex  items-center gap-4 border-b border-gray-200 py-4 bg-white dark:bg-gray-800 rounded-md shadow-sm animate-pulse">
      {/* Image Placeholder */}
      <div className="relative h-24 w-24 flex-shrink-0 bg-gray-300 dark:bg-gray-700 rounded-md">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-600 to-transparent animate-shimmer"></div>
      </div>
      <div className="flex flex-col flex-grow">
        {/* Title */}
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded-md w-3/4 mb-2"></div>
        {/* Price */}
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded-md w-1/2 mb-1"></div>
        {/* Total Price */}
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded-md w-1/2"></div>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          {/* Decrement Button */}
          <div className="h-8 w-8 bg-gray-300 dark:bg-gray-700 rounded-md"></div>
          {/* Quantity */}
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded-md w-8"></div>
          {/* Increment Button */}
          <div className="h-8 w-8 bg-gray-300 dark:bg-gray-700 rounded-md"></div>
        </div>
        {/* Remove Button */}
        <div className="h-8 w-8 bg-gray-300 dark:bg-gray-700 rounded-md"></div>
      </div>
    </li>
  );
};

const LoadingSkeletonGroup = () => {
  return (
    <div className="grid grid-cols-1 gap-4 px-8">
      {[...Array(3)].map((_, index) => (
        <CardSkeleton key={index} />
      ))}
    </div>
  );
};

export default LoadingSkeletonGroup;
