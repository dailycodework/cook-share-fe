import React, { useEffect, useState } from "react";
import { getAllCuisines } from "../services/RecipeService";

const CuisineFilter = ({ onFilterChange }) => {
  const [cuisines, setCuisines] = useState([]);
  const [selectedCuisines, setSlectedCuisines] = useState([]);

  useEffect(() => {
    const fetchCuisines = async () => {
      try {
        const response = await getAllCuisines();
        const validaCuisines = response.filter(
          (cuisine) => typeof cuisine === "string" && cuisine.trim() !== ""
        );
        setCuisines(validaCuisines.sort());
      } catch (error) {
        console.error(error);
      }
    };
    fetchCuisines();
  }, []);

  const handleCuisineToggle = (cuisine) => {
    setSlectedCuisines((prev) => {
      const newSelection = prev.includes(cuisine)
        ? prev.filter((c) => c !== cuisine)
        : [...prev, cuisine];
      return newSelection;
    });
  };

  useEffect(() => {
    onFilterChange(selectedCuisines);
  }, [selectedCuisines, onFilterChange]);

  return (
    <div className='sidebar mt-5'>
      <h4>Cuisines</h4>
      <div className='filter-options'>
        {cuisines.map((cuisine, index) => (
          <label key={index} className='filter-option'>
            <input
              type='checkbox'
              checked={selectedCuisines.includes(cuisine)}
              onChange={() => handleCuisineToggle(cuisine)}
            />

            <span className='checkmark'></span>
            {cuisine}
          </label>
        ))}
      </div>
    </div>
  );
};

export default CuisineFilter;
