import React, { useState, useEffect } from "react";
import { getAllCategories } from "../services/RecipeService";

const CategorySelector = ({
  selectedCategory,
  onCategoryChange,
  newCategory,
  showNewCategoryInput,
  setNewCategory,
  setShowNewCategoryInput,
}) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getAllCategories();
        setCategories(response);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const handleAddNewCategory = () => {
    if (newCategory !== "") {
      setCategories((prevCategories) => [...prevCategories, newCategory]);
      onCategoryChange(newCategory);
      setNewCategory("");
      setShowNewCategoryInput(false);
    }
  };

  const handleCategoryChange = (e) => {
    if (e.target.value === "New") {
      setShowNewCategoryInput(true);
    } else {
      onCategoryChange(e.target.value);
    }
  };

  const handleNewCategoryChange = (e) => {
    setNewCategory(e.target.value);
  };

  return (
    <div>
      <label className='form-label'> Categories :</label>
      <select
        className='form-select'
        required
        value={selectedCategory}
        onChange={handleCategoryChange}>
        <option value=''>...you can select or add new category...</option>
        <option value='New'>Add New Category</option>
        {categories.map((category, index) => (
          <option key={index} value={category}>
            {category}
          </option>
        ))}
      </select>

      {showNewCategoryInput && (
        <div className='input-group mt-2'>
          <input
            type='text'
            className='form-control'
            value={newCategory}
            placeholder='Enter new category'
            onChange={handleNewCategoryChange}
          />
          <button
            className='btn btn-secondary btn-sm'
            type='button'
            onClick={handleAddNewCategory}>
            Add Category
          </button>
        </div>
      )}
    </div>
  );
};

export default CategorySelector;
