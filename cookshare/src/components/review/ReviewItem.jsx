import React, { useState } from "react";
import { Card } from "react-bootstrap";
import Placeholder from "../../assets/images/placeholder1.jpg";
import RatingStars from "../common/RatingStars";
import CustomLink from "../common/CustomLink";
import { FaEdit, FaTrash } from "react-icons/fa";

const ReviewItem = ({ review, onEdit, onDelete }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleEdit = () => {
    if (onEdit) {
      onEdit(review);
    }
  };

  const handleDelete = () => {
    if (onDelete) {
      onDelete(review.id);
    }
  };

  const username = review.user?.username || "Unknown User";

  return (
    <div
      className='review-item'
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}>
      <img src={Placeholder} alt={"Photo"} />
      <div>
        <strong className='username'>{username} </strong>{" "}
        <RatingStars rating={review.stars} />
        <Card.Text>{review.feedBack}</Card.Text>
      </div>

      {isHovered && (
        <div className='review-item-controls'>
          <CustomLink
            onClick={handleEdit}
            to='review-form'
            className='text-info me-2'
            style={{ cursor: "pointer" }}>
            <FaEdit />
          </CustomLink>

          <span variant='link' onClick={handleDelete} className='text-danger'>
            {" "}
            <FaTrash />
          </span>
        </div>
      )}
    </div>
  );
};

export default ReviewItem;
