import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { useParams, Link, useNavigate } from "react-router-dom";
import { FaEdit, FaTrash, FaArrowLeft } from "react-icons/fa";
import { nanoid } from "nanoid";
import RecipeDescription from "./RecipeDescription";
import ImageDownloader from "../image/ImageDownloader";
import Like from "../common/Like";
import RatingStars from "../common/RatingStars";
import RecipeIngredients from "./RecipeIngredients";
import RecipeInstruction from "./RecipeInstruction";
import PreparationDetails from "../common/PreparationDetails";
import {
  getRecipeById,
  addNewOrUpdateReview,
  deleteReview,
  deleteRecipe,
} from "../services/RecipeService";
import Placeholder from "../../assets/images/placeholder1.jpg";
import Reviews from "../review/Reviews";
import ReviewForm from "../review/ReviewForm";
import { toast, ToastContainer } from "react-toastify";


const RecipeDetails = () => {
  const [recipe, setRecipe] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [editingReview, setEditingReview] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const[isHovered, setIsHovered] = useState(false);
  const { recipeId } = useParams();
  const navigate = useNavigate()

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await getRecipeById(recipeId);
        setRecipe(response);
        setReviews(response.reviews);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };
    fetchRecipe();
  }, [recipeId]);

  const handleEditReview = (review) => {
    setEditingReview(review);
  };

  const handleReviewOperations = async ({ recipeId, reviewInfo }) => {
    let temporaryId;
    if (editingReview) {
      // Optimistically update the existing review in state
      temporaryId = editingReview.id;
      setReviews((prevReviews) =>
        prevReviews.map((rating) =>
          rating.id === temporaryId ? { ...reviews, ...reviewInfo } : rating
        )
      );
    } else {
      // Optimistically add the new review to state
      temporaryId = nanoid(); // Temporary ID for optimistic update
      setReviews((prevReviews) => [
        ...prevReviews,
        { ...reviewInfo, id: temporaryId }, // Use temporary ID for UI update
      ]);
    }

    try {
      console.log("The review data :", { recipeId, reviewInfo });
      await addNewOrUpdateReview({ recipeId, reviewInfo });
      toast.success(
        editingReview
          ? "Your review has been updated!"
          : "Thanks for your feedback!"
      );
    } catch (error) {
      console.log("The error occurred: ", error);
      toast.error(error.message);
      if (editingReview) {
        setReviews((prevReviews) =>
          prevReviews.map((review) =>
            review.id === temporaryId ? editingReview : review
          )
        );
      } else {
        // Remove the optimistically added review if adding fails
        setReviews((prevReviews) =>
          prevReviews.filter((review) => review.id !== temporaryId)
        );
      }
    }
    resetEditing();
  };

  const resetEditing = () => {
    setEditingReview(null);
  };

  const handleDeleteReview = async (ratingId) => {
    setReviews((prevReviews) =>
      prevReviews.filter((rating) => rating.id !== ratingId)
    );
    try {
      console.log("The reviewId :", { ratingId, recipeId });
      await deleteReview({ ratingId, recipeId });
      toast.success("Review deleted successfully!");
    } catch (error) {
      console.log("The error :", error);
      toast.error(error.message);
    }
  };



  const handleDeleteRecipe = async () => {
    try {
      await deleteRecipe({ recipeId });
      toast.success("Recipe deleted successfully!");
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      console.log("The error from the delete :", error);
      toast.error(error.message);
    }
  };




  return (
    <Container>
      <ToastContainer />
      <Row className='justify-content-center mb-5 mt-5'>
        <Col md={6} lg={8}>
          <Card className='text-center'>
            {recipe && (
              <Card.Body>
                <h2 className='recipe-title'>{recipe.title}</h2>

                <div
                  className='review-item'
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}>
                  {isHovered && (
                    <div className='review-item-controls'>
                      <Link
                        to={`/update-image/${recipe.id}/update-image`}
                        className='text-info me-4'
                        style={{ cursor: "pointer" }}>
                        <FaEdit /> Change Recipe Image
                      </Link>

                      <Link
                        to={`/update/${recipe.id}/update-recipe`}
                        className='text-info me-4'
                        style={{ cursor: "pointer" }}>
                        <FaEdit /> Edit Recipe Details
                      </Link>
                      <span
                        variant='link'
                        onClick={handleDeleteRecipe}
                        className='text-danger'>
                        <FaTrash /> Delete Recipe
                      </span>
                    </div>
                  )}
                </div>

                <RecipeDescription description={recipe.description} />

                <div className='image-container'>
                  {recipe.imageDto && (
                    <ImageDownloader recipeId={recipe.imageDto.id} />
                  )}
                </div>

                <Row className='mt-4'>
                  <Col>
                    <Like recipeId={recipe.id} />
                  </Col>
                  <Col>
                    <Card.Text className='rating d-flex justify-content-end'>
                      <RatingStars rating={recipe.averageRating} />(
                      {recipe.totalRateCount})
                    </Card.Text>
                  </Col>
                </Row>

                <hr />
                <h3 style={{ color: "gray" }}>{recipe.cuisine} Cuisine</h3>
                <hr />
                <RecipeIngredients ingredients={recipe.ingredients} />
                <hr />

                <RecipeInstruction instructions={recipe.instruction} />

                <p className='sub-titles'>Reparation:</p>
                <PreparationDetails
                  prepTime={recipe.prepTime}
                  cookTime={recipe.cookTime}
                  category={recipe.category}
                />

                <hr className='mb-4' />
                <div className='review-item'>
                  <p>
                    {" "}
                    Recipe shared by :
                    <strong className='username'>{recipe.user.username}</strong>
                  </p>

                  <img src={Placeholder} alt={"Photo"} />
                  <div className='mt-2'>
                    <strong className='username'>
                      {recipe.user.username}{" "}
                    </strong>
                    is a renowned cook at some well known cooking company in
                    town...
                  </div>
                </div>

                <hr className='mb-4' />
                <div id='review-form'>
                  <ReviewForm
                    editingReview={editingReview}
                    onReviewSubmit={handleReviewOperations}
                  />
                </div>

                <hr className='mb-4' />
                <Reviews
                  reviews={reviews}
                  onEditReview={handleEditReview}
                  onDeleteReview={handleDeleteReview}
                />

                  <Link
                                to={"/"}
                                className='btn btn-sm btn-secondary mt-3'
                                style={{ backgroundColor: "#562f63b5" }}>
                                <FaArrowLeft /> Back to recipes
                              </Link>
              </Card.Body>
            )}
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default RecipeDetails;
