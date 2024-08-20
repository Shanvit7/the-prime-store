"use client";
// UTILS
import { FC } from "react";
// COMPONENTS
import Image from "next/image";
// TYPES
interface VariantCirclesProps {
  images: string[];
  title: string;
  onImageHover: (src: string) => void;
  defaultImage: string;
}

// Used for showing variations of a product
const VariantCircles: FC<VariantCirclesProps> = ({
  images = [],
  title = "",
  onImageHover,
  defaultImage,
}) => (
  <div data-cy="variant-circles" className="flex overflow-x-auto py-2 space-x-2">
    {images.length > 0 ? (
      images.map((src, index) => (
        <div
          key={index}
          className="relative w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 flex-shrink-0 rounded-full border-2 border-gray-300 cursor-pointer hover:border-gray-500 transition-colors duration-300"
          onMouseEnter={() => onImageHover(src)}
        >
          <Image
            src={src}
            alt={`${title} variant ${index + 1}`}
            className="object-cover rounded-full"
            fill
            sizes="(max-width: 640px) 32px, (max-width: 768px) 40px, 48px"
          />
        </div>
      ))
    ) : (
      <div
        className="relative w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full border-2 border-gray-300 cursor-pointer hover:border-gray-500 transition-colors duration-300"
        onMouseEnter={() => onImageHover(defaultImage)}
      >
        <Image
          src={defaultImage}
          alt={title}
          className="object-cover rounded-full"
          fill
          sizes="(max-width: 640px) 32px, (max-width: 768px) 40px, 48px"
        />
      </div>
    )}
  </div>
);

export default VariantCircles;
