// COMPONENTS
import Ratings from "@/components/products/ratings";

const Reviews = ({ reviews = [] }) => {
  const isEmpty = reviews.length === 0;
  return (
    <div
      data-cy="product-reviews"
      className="mt-8 bg-white shadow-lg rounded-lg overflow-hidden"
    >
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>
        {isEmpty ? (
          <p>No reviews added yet</p>
        ) : (
          reviews.map(
            (
              { rating = 0, date = "", reviewerName = "...", comment = "..." },
              index
            ) => (
              <div
                key={index}
                className="mb-4 pb-4 border-b border-gray-200 last:border-b-0"
              >
                <div className="flex items-center mb-2">
                  <div className="flex">
                    <Ratings rating={rating} />
                  </div>
                  <span className="ml-2 text-gray-600 text-sm">
                    {new Date(date).toLocaleDateString()}
                  </span>
                </div>
                <p className="font-semibold">{reviewerName}</p>
                <p className="text-gray-700">{comment}</p>
              </div>
            )
          )
        )}
      </div>
    </div>
  );
};

export default Reviews;
