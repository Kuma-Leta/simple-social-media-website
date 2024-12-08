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
    <div className="rating-container">
      <p className="rating-text whitespace-nowrap">
        {hasRated ? "rated:" : "Rate ?"}
      </p>
      <div className="stars">
        {[1, 2, 3, 4, 5].map((value) => (
          <button
            key={value}
            onClick={() => handleRating(value)}
            // disabled={hasRated}
            style={{
              color: hasRated && value <= myRating ? "gold" : "gray",
            }}
          >
            <i className="fas fa-star"></i>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Rating;
