import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaStar } from "react-icons/fa"; // Importing FontAwesome stars

// Star Rating Component
 function StarRating({ rating, onRatingChange }) {
  const handleClick = (star) => {
    onRatingChange(star);
  };

  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <FaStar
          key={star}
          size={30}
          color={star <= rating ? "#FFD700" : "#DDD"} // Yellow if rated, grey if not
          onClick={() => handleClick(star)}
          className="cursor-pointer"
        />
      ))}
    </div>
  );
}
export default StarRating;