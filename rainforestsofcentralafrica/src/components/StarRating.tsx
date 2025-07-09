
import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number;
  maxStars?: number;
  size?: "sm" | "md" | "lg";
}

const StarRating = ({ rating, maxStars = 5, size = "md" }: StarRatingProps) => {
  const sizeClasses = {
    sm: "h-3 w-3",
    md: "h-4 w-4",
    lg: "h-5 w-5"
  };

  return (
    <div className="flex items-center space-x-1">
      {Array.from({ length: maxStars }, (_, index) => {
        const starNumber = index + 1;
        const isFilled = starNumber <= Math.floor(rating);
        const isHalfFilled = starNumber === Math.ceil(rating) && rating % 1 !== 0;

        return (
          <div key={index} className="relative">
            <Star 
              className={`${sizeClasses[size]} ${
                isFilled ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
              }`}
            />
            {isHalfFilled && (
              <div className="absolute inset-0 overflow-hidden w-1/2">
                <Star className={`${sizeClasses[size]} fill-yellow-400 text-yellow-400`} />
              </div>
            )}
          </div>
        );
      })}
      <span className="text-sm font-medium text-gray-700 ml-2">
        {rating.toFixed(1)} out of {maxStars}
      </span>
    </div>
  );
};

export default StarRating;
