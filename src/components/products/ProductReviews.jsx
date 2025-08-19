import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star, StarIcon, ThumbsUp, ThumbsDown } from "lucide-react";

const StarRating = ({ rating, size = "sm" }) => {
  const sizeClasses = size === "lg" ? "w-5 h-5" : "w-4 h-4";
  
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <StarIcon
          key={star}
          className={`${sizeClasses} ${
            star <= rating
              ? "fill-yellow-400 text-yellow-400"
              : "fill-gray-200 text-gray-200"
          }`}
        />
      ))}
    </div>
  );
};

const ReviewCard = ({ review }) => {
  const [voteState, setVoteState] = useState(null); // 'up', 'down', or null
  const [helpfulCount, setHelpfulCount] = useState(review.helpful || 0);
  const [unhelpfulCount, setUnhelpfulCount] = useState(review.unhelpful || 0);

  const handleVote = (type) => {
    if (voteState === type) {
      // Remove vote
      if (type === 'up') {
        setHelpfulCount(prev => prev - 1);
      } else {
        setUnhelpfulCount(prev => prev - 1);
      }
      setVoteState(null);
    } else {
      // Add or change vote
      if (voteState === 'up') {
        setHelpfulCount(prev => prev - 1);
      } else if (voteState === 'down') {
        setUnhelpfulCount(prev => prev - 1);
      }
      
      if (type === 'up') {
        setHelpfulCount(prev => prev + 1);
      } else {
        setUnhelpfulCount(prev => prev + 1);
      }
      setVoteState(type);
    }
  };

  return (
    <Card className="p-6 mb-4">
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
          <span className="text-sm font-medium text-primary">
            {review.reviewerName.charAt(0).toUpperCase()}
          </span>
        </div>
        
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <div>
              <div className="font-medium text-sm">{review.reviewerName}</div>
              <div className="text-xs text-muted-foreground">{review.date}</div>
            </div>
            <StarRating rating={review.rating} />
          </div>
          
          {review.variant && (
            <div className="text-xs text-muted-foreground mb-2">
              Phân loại: {review.variant}
            </div>
          )}
          
          <p className="text-sm text-foreground mb-3 leading-relaxed">
            {review.comment}
          </p>
          
          {review.images && review.images.length > 0 && (
            <div className="flex gap-2 mb-3">
              {review.images.map((image, index) => (
                <div
                  key={index}
                  className="w-16 h-16 rounded-md overflow-hidden border"
                >
                  <img
                    src={image}
                    alt={`Review image ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          )}
          
          {/* Vote buttons */}
          <div className="flex items-center gap-4 pt-2">
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                className={`h-8 px-2 gap-1 ${
                  voteState === 'up' 
                    ? 'text-green-600 bg-green-50 hover:bg-green-100' 
                    : 'text-muted-foreground hover:text-green-600'
                }`}
                onClick={() => handleVote('up')}
              >
                <ThumbsUp className="w-3 h-3" />
                <span className="text-xs">{helpfulCount}</span>
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                className={`h-8 px-2 gap-1 ${
                  voteState === 'down' 
                    ? 'text-red-600 bg-red-50 hover:bg-red-100' 
                    : 'text-muted-foreground hover:text-red-600'
                }`}
                onClick={() => handleVote('down')}
              >
                <ThumbsDown className="w-3 h-3" />
                <span className="text-xs">{unhelpfulCount}</span>
              </Button>
            </div>
            
            <div className="text-xs text-muted-foreground">
              {voteState === 'up' && "Bạn thấy hữu ích"}
              {voteState === 'down' && "Bạn thấy không hữu ích"}
              {!voteState && "Đánh giá này có hữu ích không?"}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export const ProductReviews = ({ reviews, averageRating, totalReviews, totalSales }) => {
  const [selectedFilter, setSelectedFilter] = useState("all");
  
  const ratingCounts = {
    5: reviews.filter(r => r.rating === 5).length,
    4: reviews.filter(r => r.rating === 4).length,
    3: reviews.filter(r => r.rating === 3).length,
    2: reviews.filter(r => r.rating === 2).length,
    1: reviews.filter(r => r.rating === 1).length,
  };
  
  const filteredReviews = selectedFilter === "all" 
    ? reviews 
    : reviews.filter(r => r.rating === parseInt(selectedFilter));
  
  const getRatingWidth = (count) => {
    return totalReviews > 0 ? (count / totalReviews) * 100 : 0;
  };

  return (
    <div className="space-y-6">
      {/* Overall Rating Section */}
      <Card className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Rating Summary */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
              <span className="text-3xl font-bold text-primary">
                {averageRating.toFixed(1)}
              </span>
              <StarRating rating={Math.round(averageRating)} size="lg" />
            </div>
            <div className="text-sm text-muted-foreground">
              {totalReviews} đánh giá • {totalSales} đã bán
            </div>
          </div>
          
          {/* Rating Breakdown */}
          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map((stars) => (
              <div key={stars} className="flex items-center gap-2 text-sm">
                <span className="w-6">{stars}</span>
                <StarIcon className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-yellow-400 h-2 rounded-full transition-all"
                    style={{ width: `${getRatingWidth(ratingCounts[stars])}%` }}
                  />
                </div>
                <span className="w-8 text-right text-muted-foreground">
                  {ratingCounts[stars]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Filter Tabs */}
      <div className="border-b">
        <div className="flex gap-1 overflow-x-auto pb-2">
          <Button
            variant={selectedFilter === "all" ? "default" : "ghost"}
            size="sm"
            onClick={() => setSelectedFilter("all")}
            className="whitespace-nowrap"
          >
            Tất cả ({totalReviews})
          </Button>
          {[5, 4, 3, 2, 1].map((stars) => (
            <Button
              key={stars}
              variant={selectedFilter === stars.toString() ? "default" : "ghost"}
              size="sm"
              onClick={() => setSelectedFilter(stars.toString())}
              className="whitespace-nowrap"
            >
              {stars} sao ({ratingCounts[stars]})
            </Button>
          ))}
        </div>
      </div>

      {/* Reviews List */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-medium">
            {selectedFilter === "all" 
              ? `Tất cả đánh giá (${filteredReviews.length})`
              : `${selectedFilter} sao (${filteredReviews.length})`
            }
          </h3>
        </div>
        
        {filteredReviews.length > 0 ? (
          <div className="space-y-4">
            {filteredReviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
            
            {filteredReviews.length > 5 && (
              <div className="text-center pt-4">
                <Button variant="outline">
                  Xem thêm đánh giá
                </Button>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Star className="w-8 h-8 text-gray-400" />
            </div>
            <p>Chưa có đánh giá nào cho mức đánh giá này</p>
          </div>
        )}
      </div>
    </div>
  );
};