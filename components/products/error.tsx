// ASSETS
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
const ProductsError = () => (
  <div className="min-w-0 max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl h-auto bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden flex flex-col items-center justify-center p-6 space-y-4">
    <div className="text-3xl sm:text-4xl md:text-5xl text-gray-400 dark:text-gray-600 mb-4">
      <ExclamationCircleIcon className="h-10 w-10 sm:h-12 sm:w-12 md:h-16 md:w-16" />
    </div>
    <div className="text-center">
      <h1 className="text-xl md:text-3xl font-bold">Oops!</h1>
      <p className="p-2 text-balance">
        Something went wrong. We&apos;re working on it!
      </p>
      <i className="text-sm font-semibold">Please check back later while we fix the issue</i>
    </div>
  </div>
);

export default ProductsError;
