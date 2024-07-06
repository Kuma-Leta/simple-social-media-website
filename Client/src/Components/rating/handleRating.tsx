import React, { useEffect, useState } from "react";
import axios from "../../axiosConfig";

interface RatingProps {
  postId: string;
  initialRating: number;
  user: string;
  updateRating: (newValue: number) => void;
}

const Rating: React.FC<RatingProps> = ({
  postId,
  initialRating,
  user,
  updateRating,
}) => {
  const [rating, setRating] = useState<number | null>(initialRating);
  const [hasRated, setHasRated] = useState<boolean>(false);

  useEffect(() => {
    const fetchRating = async () => {
      try {
        const result = await axios.get(
          `http://localhost:5000/api/getUserRating/${postId}/${user}`
        );
        if (result.data.rating) {
          setRating(result.data.rating);
          setHasRated(true);
        }
      } catch (error) {
        console.error("Error fetching user rating:", error);
      }
    };

    fetchRating();
  }, [postId, user]);

  const handleRating = async (value: number) => {
    try {
      const result = await axios.post("http://localhost:5000/api/addRating", {
        postId,
        rating: value,
        user,
      });
      setRating(value);
      setHasRated(true);
      updateRating(result.data.averagedRatingForPost);
    } catch (error) {
      console.error("Error submitting rating:", error);
    }
  };

  return (
    <p className="rateRequest">
      {hasRated ? "rated" : "rate ?"}
      {[1, 2, 3, 4, 5].map((value) => (
        <button
          key={value}
          onClick={() => handleRating(value)}
          style={{
            color: rating !== null && value <= rating ? "gold" : "gray",
          }}
        >
          ⭐
        </button>
      ))}
    </p>
  );
};

export default Rating;
