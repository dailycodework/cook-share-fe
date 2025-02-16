import React from "react";
import { Col, Row, Card } from "react-bootstrap";
import ImageDownloader from "../image/ImageDownloader";
import Like from "../common/Like";
import RatingStars from "../common/RatingStars";
import PreparationDetails from "../common/PreparationDetails";
import { Link } from "react-router-dom";

const RecipeCard = ({ recipe }) => {
  return (
    <Row className='justify-content-center mb-5'>
      <Col>
        <Card className='text-center'>
          <Card.Body>
            <h2 className='recipe-title'>{recipe.title}</h2>
            <hr />
            <Link>
              <div className='image-container'>
                {recipe.imageDto && (
                  <ImageDownloader recipeId={recipe.imageDto.id} />
                )}
              </div>
            </Link>
            <Row className='mt-4'>
              <Col>
                <Like recipeId={recipe.id} likes={recipe.likeCount} />
              </Col>
              <Col>
                <Card.Text className='rating'>
                  <RatingStars rating={recipe.averageRating} />
                </Card.Text>
              </Col>
            </Row>
            <hr />

            <p className='cuisine-text left-align'>{recipe.cuisine} cuisine</p>
            <p className='sub-titles'>Preparation :</p>
            <PreparationDetails
              prepTime={recipe.prepTime}
              cookTime={recipe.cookTime}
              category={recipe.category}
            />
          </Card.Body>

          <Link to={`recipe/${recipe.id}/recipe-details`}          
            className='btn btn-secondary btn-sm'
            style={{ backgroundColor: "#562f63b5" }}>
            View recipe details
          </Link>
        </Card>
      </Col>
    </Row>
  );
};

export default RecipeCard;
