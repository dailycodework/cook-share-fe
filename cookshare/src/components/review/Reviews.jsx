import React from "react";
import { ListGroup } from "react-bootstrap";
import ReviewItem from "./ReviewItem";

const Reviews = ({ reviews, onEditReview, onDeleteReview }) => {
  return (
    <>
      <p className='mt-3 sub-titles'>Reviews:</p>

      <ListGroup>
        {reviews.map((review, index) => {
          return (
            <ListGroup.Item key={index} className='review-item'>
              <ReviewItem review={review} onEdit={onEditReview} onDelete={onDeleteReview} />
            </ListGroup.Item>
          );
        })}
      </ListGroup>
    </>
  );
};

export default Reviews;
