import React, { useEffect, useState } from "react";

const RecipeImage = ({ recipeId }) => {
  const [recipeImage, setRecipeImage] = useState(null);

  useEffect(() => {
    const fetchRecipeImage = async (id) => {
      try {
        const response = await fetch(
          `http://localhost:9393/api/images/image/download/${id}`
        );
        const blobImage = await response.blob();
        const reader = new FileReader();
        reader.onloadend = () => {
          setRecipeImage(reader.result);
        };
        reader.readAsDataURL(blobImage);
      } catch (error) {
        console.error("Error fetching recipe image:", error);
      }
    };

    if (recipeId) {
      fetchRecipeImage(recipeId);
    }
  }, [recipeId]);

  if (!recipeImage) return null;

  return (
    <div>
      <img src={recipeImage} alt='Recipe Inage'></img>
    </div>
  );
};

export default RecipeImage;
