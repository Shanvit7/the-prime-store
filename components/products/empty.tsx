// ASSETS
import { ExclamationTriangleIcon } from "@heroicons/react/20/solid";

const NoProducts = () => {
  return (
    <div data-cy="no-products" className="min-w-0 max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl h-auto bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden flex flex-col items-center justify-center p-6 space-y-4">
      <div className="text-3xl sm:text-4xl md:text-5xl text-gray-400 dark:text-gray-600 mb-4">
        <ExclamationTriangleIcon className="h-10 w-10 sm:h-12 sm:w-12 md:h-16 md:w-16" />
      </div>

      <div className="text-center">
        <p className="text-base sm:text-lg md:text-xl font-semibold text-gray-800 dark:text-white mb-2">
          No Products Available
        </p>
        <p className="text-xs sm:text-sm md:text-base text-gray-600 dark:text-gray-400">
          We&apos;re sorry, but there are no products available right now.
          Please check back later.
        </p>
      </div>
    </div>
  );
};

export default NoProducts;
