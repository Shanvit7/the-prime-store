import { StarIcon } from "@heroicons/react/20/solid";

const Ratings = ({ rating = 0 }) => (
  <>
    {[...Array(5)].map((_, i) => (
      <StarIcon
        key={i}
        className={`w-5 h-5 ${
          i < Math.round(rating) ? "text-yellow-400" : "text-gray-300"
        }`}
        fill="currentColor"
      />
    ))}
  </>
);

export default Ratings;
