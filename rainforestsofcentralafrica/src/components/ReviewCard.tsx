
import { Badge } from "@/components/ui/badge";
import StarRating from "./StarRating";

interface ReviewCardProps {
  rating: number;
  title: string;
  author: string;
  date: string;
  content: string;
  verified?: boolean;
}

const ReviewCard = ({ rating, title, author, date, content, verified }: ReviewCardProps) => {
  return (
    <div className="border-b border-gray-200 pb-6 last:border-b-0">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
            <span className="text-sm font-semibold text-gray-600">
              {author.charAt(0)}
            </span>
          </div>
          <div>
            <p className="font-semibold text-gray-900">{author}</p>
            {verified && (
              <Badge variant="outline" className="text-xs">
                Verified Purchase
              </Badge>
            )}
          </div>
        </div>
        <span className="text-sm text-gray-500">{date}</span>
      </div>
      
      <div className="mb-3">
        <StarRating rating={rating} size="sm" />
      </div>
      
      <h4 className="font-semibold text-gray-900 mb-2">{title}</h4>
      <p className="text-gray-700 leading-relaxed">{content}</p>
      
      <div className="mt-3 flex items-center space-x-4 text-sm">
        <button className="text-gray-500 hover:text-gray-700">Helpful</button>
        <button className="text-gray-500 hover:text-gray-700">Report</button>
      </div>
    </div>
  );
};

export default ReviewCard;
