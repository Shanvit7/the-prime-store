// UTILS
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const getImageUrl = (imageData: string | string []) => {
    if (typeof imageData === 'string') {
      try {
        // Attempt to parse the string as JSON
        const parsed = JSON.parse(imageData);
        // If it's an array, return the first element
        if (Array.isArray(parsed)) {
          return parsed[0];
        }
        // If it's a string (valid URL), return it
        if (typeof parsed === 'string') {
          return parsed;
        }
      } catch (e) {
        // If parsing fails, assume it's already a valid URL
        return imageData;
      }
    }
    // If it's already an array, return the first element
    if (Array.isArray(imageData)) {
      return imageData[0];
    }
    // If all else fails, return an empty string or a default image URL
    return '';
};

export const cn=(...inputs: ClassValue[])=>{
  return twMerge(clsx(inputs));
};
