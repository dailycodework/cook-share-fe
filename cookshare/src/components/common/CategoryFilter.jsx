import React, { useEffect, useState } from "react";
import { getAllCategories } from "../services/RecipeService";


const CategoryFilter = ({ onCategoryClick, activeCategory }) => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getAllCategories();
        setCategories(response);
        setIsLoading(false);
      } catch (error) {
        setErrorMessage(error.message);
      }
    };
    fetchCategories();
  }, []);

  return (
    <div className="categories-container">
      {isLoading && <div>Fetching categories......</div>}
      {errorMessage && <div className='text-danger'>{errorMessage}</div>}
      {categories &&
        categories.map((category) => (
          <div
            key={category}
            onClick={() => onCategoryClick(category)}
            className={`category-item ${
              activeCategory === category ? "active" : ""
            }`}>
            {category}
          </div>
        ))}
    </div>
  );
};

export default CategoryFilter;
