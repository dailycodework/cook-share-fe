import React from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const RatingStars = ({ rating }) => {
  const totalStars = 5;
  let stars = [];

  for (let i = 1; i <= Math.floor(rating); i++) {
    stars.push(<FaStar key={i} color='#ffc107' />);
  }

  if (rating % 1 !== 0) {
    stars.push(<FaStarHalfAlt key='half' color='#ffc107' />);
  }

  for (let i = stars.length + 1; i <= totalStars; i++) {
    stars.push(<FaRegStar key={i} color='#ffc107' />);
  }

  return <span className='ms-2 me-2'>{stars}</span>;
};

export default RatingStars;
