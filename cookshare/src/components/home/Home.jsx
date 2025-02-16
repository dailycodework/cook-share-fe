import React, { use, useEffect, useState } from "react";
import Hero from "../hero/Hero";
import RecipeCard from "../recipe/RecipeCard";
import { getAllRecipes } from "../services/RecipeService";
import { Row, Col, Container } from "react-bootstrap";
import CategoryFilter from "../common/CategoryFilter";
import CuisineFilter from "../common/CuisineFilter";

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [selectedCuisines, setSelectedCuisines] = useState([]);

 useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await getAllRecipes();
        console.log("The response : ", response);
        setRecipes(response);
        setFilteredRecipes(response);
        setIsLoading(false);
      } catch (error) {
        setErrorMessage(error.message);
      }
    };
    fetchRecipes();
  }, []);


  useEffect(() => {
    let filtered = recipes;
    if (activeCategory) {
      filtered = filtered.filter(
        (recipe) => recipe.category === activeCategory
      );
    }

    if (selectedCuisines.length > 0) {
      filtered = filtered.filter((recipe) =>
        selectedCuisines.includes(recipe.cuisine)
      );
    }

    setFilteredRecipes(filtered);
  }, [activeCategory, selectedCuisines, recipes]);

  const handleCategoryClick = (category) => {
    setActiveCategory((current) => (current === category ? null : category));
  };
  const handleCuisineFilter = (cuisines) => {
    setSelectedCuisines(cuisines);
  };

  return (
    <>
      <Hero />
      <main className='home-container'>
        <CuisineFilter onFilterChange={handleCuisineFilter} />
        <Container className='main-content text-center mb-4' id='explore'>
          <h2 className='text-center mb-4 home-title'>
            Explore Recipes on CookShare
          </h2>

          <CategoryFilter
            onCategoryClick={handleCategoryClick}
            activeCategory={activeCategory}
          />

          {isLoading && <div>Loading recipes.....</div>}
          {errorMessage && (
            <div className='text-danger mb-4'>{errorMessage}</div>
          )}

          <Row>
            {filteredRecipes && filteredRecipes.length > 0 ? (
              filteredRecipes.map((recipe) => (
                <Col key={recipe.id} md={4} lg={3} sm={12} xs={12}>
                  <RecipeCard recipe={recipe} />
                </Col>
              ))
            ) : (
              <div className='text-danger mb-4'>
                No recipes found at this time , please check again later!
              </div>
            )}
          </Row>
        </Container>
      </main>
    </>
  );
};

export default Home;
