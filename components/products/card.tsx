import Image from "next/image";
import { getImageUrl } from "@/utils";

const Card = ({ data = {} }) => {
  const { images = [], title = "", price = 0 } = data ?? {};

  const primaryImage = getImageUrl(images?.[0]);
  const secondaryImage =
    images.length > 1 ? getImageUrl(images[1]) : primaryImage;

  return (
    <div className="group relative block overflow-hidden h-full shadow-xl">
      <div className="relative h-56 lg:h-64 overflow-hidden">
        <Image
          src={primaryImage}
          alt={title}
          className="absolute inset-0 h-full w-full object-cover transition-all duration-300 
                     group-hover:scale-110 opacity-100 group-hover:opacity-0"
          layout="fill"
          objectFit="cover"
        />
        <Image
          src={secondaryImage}
          alt={`${title} - alternate view`}
          className="absolute inset-0 h-full w-full object-cover transition-all duration-300 
                     group-hover:scale-110 opacity-0 group-hover:opacity-100"
          layout="fill"
          objectFit="cover"
        />
      </div>

      <div className="relative border border-gray-100 bg-white p-6 h-1/2">
        <h3 className="mt-4 text-lg font-medium text-gray-900 group-hover:underline group-hover:underline-offset-4">
          {title}
        </h3>
        <div className="mt-1.5 flex items-center justify-between text-gray-900">
          <p className="tracking-wide">${price}</p>
        </div>
        <form className="mt-4">
          <button className="block w-full rounded bg-yellow-400 p-2 text-sm font-medium transition hover:scale-105">
            Add to Cart
          </button>
        </form>
      </div>
    </div>
  );
};

export default Card;
