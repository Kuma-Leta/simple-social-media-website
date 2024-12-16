import React, { useEffect, useState } from "react";
import axios from "../../axiosConfig";
import "../../styles/rating.css";

interface RatingProps {
  postId: string;
  initialRating: number;
  postOwner: string;
  updateRating: (newValue: number) => void;
  raterId: string;
  rater: string;
}

const Rating: React.FC<RatingProps> = ({
  postId,
  initialRating,
  postOwner,
  raterId,
  rater,
  updateRating,
}) => {
  const [rating, setRating] = useState<number | null>(initialRating);
  const [hasRated, setHasRated] = useState<boolean>(false);
  const [myRating, setMyRating] = useState(rating);

  useEffect(() => {
    const fetchRating = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/getUserRating/${postId}/${raterId}`
        );
        if (response.data.rating) {
          // setRating(response.data.rating.amount);
          console.log(response.data.rating);
          setMyRating(response.data?.rating);
          setHasRated(true);
        }
      } catch (error) {
        console.error("Error fetching user rating:", error);
      }
    };

    fetchRating();
  }, [postId, raterId, rating]);

  const handleRating = async (value: number) => {
    try {
      const response = await axios.post("http://localhost:5000/api/addRating", {
        postId,
        amount: value,
        postOwner,
        raterId,
        rater,
      });
      setRating(value);
      setHasRated(true);
      updateRating(response.data.updatedRating);
    } catch (error) {
      console.error("Error submitting rating:", error);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <p className="text-sm font-medium whitespace-nowrap">
        {hasRated ? "Rated:" : "Rate?"}
      </p>
      <div className="flex gap-1" role="group" aria-label="Rating stars">
        {[1, 2, 3, 4, 5].map((value) => (
          <button
            key={value}
            onClick={() => handleRating(value)}
            aria-label={`Rate ${value} star${value > 1 ? "s" : ""}`}
            aria-disabled={hasRated}
            className={`text-xl transition-colors ${
              hasRated && value <= myRating
                ? "text-yellow-400"
                : "text-gray-400"
            } hover:text-yellow-400 focus:outline-none`}
          >
            <i className="fas fa-star"></i>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Rating;
