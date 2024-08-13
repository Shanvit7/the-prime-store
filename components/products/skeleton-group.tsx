const Skeleton = () => {
  return (
    <div className="min-w-full h-96 bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
      {/* Image placeholder */}
      <div className="h-48 bg-gray-300 dark:bg-gray-700 animate-pulse">
        <div className="h-full w-full bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-600 to-transparent animate-shimmer"></div>
      </div>
      
      {/* Content area */}
      <div className="p-4 space-y-3">
        {/* Title */}
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded-md animate-pulse w-3/4"></div>
        
        {/* Description */}
        <div className="space-y-2">
          <div className="h-3 bg-gray-200 dark:bg-gray-600 rounded-md animate-pulse"></div>
          <div className="h-3 bg-gray-200 dark:bg-gray-600 rounded-md animate-pulse w-5/6"></div>
        </div>
        
        {/* Price */}
        <div className="h-5 bg-gray-300 dark:bg-gray-700 rounded-md animate-pulse w-1/4"></div>
        
        {/* Button */}
        <div className="mt-4 h-10 bg-yellow-200 dark:bg-yellow-700 rounded-md animate-pulse"></div>
      </div>
    </div>
  );
};

const LoadingSkeletonGroup = () => {
  return (
    <div className="grid grid-cols-3 gap-2">
      {[...Array(9)].map((_, index) => (
        <Skeleton key={index} />
      ))}
    </div>
  );
};

export default LoadingSkeletonGroup;
