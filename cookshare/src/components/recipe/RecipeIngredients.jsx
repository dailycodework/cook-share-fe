import React from 'react'

const RecipeIngredients = ({ingredients}) => {
  return (
    <div
      className='mt-5 p-4 left-align'
      style={{ backgroundColor: "whitesmoke" }}>
      <p className='sub-titles'>Ingredients</p>
      <ul>
        {ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
    </div>
  );
}

export default RecipeIngredients
