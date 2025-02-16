import React from 'react'
import {Card} from "react-bootstrap"

const RecipeDescription = ({description}) => {
  return (
    <>
      <p className='mt-3 sub-titles'>About The Recipe </p>
      <Card.Text className='left-align'>{description}</Card.Text>
    </>
  );
}

export default RecipeDescription
