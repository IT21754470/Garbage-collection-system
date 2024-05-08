import React from 'react';
import { FaStar } from 'react-icons/fa';

// Star Display Component
const StarDisplay = ({ rate }) => {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <FaStar
          key={star}
          size={20}
          color={star <= rate ? "#FFD700" : "#DDD"}
        />
      ))}
    </div>
  );
};

export default StarDisplay;
