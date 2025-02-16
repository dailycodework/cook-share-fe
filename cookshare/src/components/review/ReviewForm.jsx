import React, {useState, useEffect} from 'react'
import { Form, Button } from "react-bootstrap"
import { FaStar } from "react-icons/fa"
import { useParams } from 'react-router-dom'

const ReviewForm = ({ editingReview, onReviewSubmit }) => {
    const [hover, setHover] = useState(null);
    const [rating, setRating] = useState(null);
    const [feedback, setFeedback] = useState("");
    const { recipeId } = useParams();
    const userId  = 1


    
  const handleRatingChange = (value) => {
    setRating(value);
  };

  const handleFeedbackChange = (e) => {
    setFeedback(e.target.value);
    };


    useEffect(() => {
      if (editingReview) {
        setRating(editingReview.star);
        setFeedback(editingReview.feedBack);
      } else {
        resetForm();
      }
    }, [editingReview]);


    

      const handleSubmit = async (e) => {
        e.preventDefault();
        const reviewInfo = {
          userId,
          stars: rating,
          feedBack: feedback,
        };
        if (onReviewSubmit) {
          await onReviewSubmit({ recipeId, reviewInfo });
          resetForm();
        }
      };

 const resetForm = () => {
   setRating(null);
   setFeedback("");
 };




  return (
    <Form onSubmit={handleSubmit}>
      <div className='mb-2'>
        {[...Array(5)].map((_, index) => {
          const ratingValue = index + 1;
          return (
            <Form.Label key={index} className='me-2'>
              <Form.Control
                type='radio'
                name='rating'
                value={ratingValue}
                onChange={() => handleRatingChange(ratingValue)}
                checked={rating === ratingValue}
                style={{ display: "none" }}
              />

              <FaStar
                size={18}
                className='star'
                color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
                onMouseEnter={() => setHover(ratingValue)}
                onMouseLeave={() => setHover(null)}
              />
            </Form.Label>
          );
        })}
      </div>

      <Form.Group controlId='feedback'>
        <Form.Control
          as='textarea'
          row={4}
          value={feedback}
          required
          onChange={handleFeedbackChange}
          placeholder='Leave a review for this recipe'
          style={{ border: "1px solid  #562f63b5" }}
        />
      </Form.Group>

      <div className='mt-2'>
        <Button type='submit' variant='outline-secondary'>
          {editingReview ? "Update Review" : "Submit Review"}
        </Button>
      </div>
    </Form>
  );
}

export default ReviewForm
