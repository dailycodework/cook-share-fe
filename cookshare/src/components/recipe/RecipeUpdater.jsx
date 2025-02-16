import React, { useState, useEffect } from "react";
import { getRecipeById, updateRecipe } from "../services/RecipeService";
import { Row, Col, Form, Container, Card, Button } from "react-bootstrap";
import IngredientsUpdater from "../common/IngredientsUpdater";
import CountrySelector from "../common/CountrySelector";
import CategorySelector from "../common/CategorySelector";
import { FaArrowLeft } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const RecipeUpdater = () => {
  const [newCategory, setNewCategory] = useState("");
  const [showNewCategoryInput, setShowNewCategoryInput] = useState(false);
  const { recipeId } = useParams();
  const [recipe, setRecipe] = useState({
    title: "",
    prepTime: "",
    cookTime: "",
    category: "",
    description: "",
    cuisine: "",
    instruction: "",
    ingredients: [],
  });

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await getRecipeById(recipeId);
        setRecipe(response);
      } catch (error) {
        console.error("Error fetching recipe:", error);
      }
    };

    fetchRecipe();
  }, [recipeId]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecipe((prevRecipe) => ({ ...prevRecipe, [name]: value }));
  };

  // Handle ingredient changes
  const handleIngredientChange = (index, value) => {
    const newIngredients = [...recipe.ingredients];
    newIngredients[index] = value;
    setRecipe((prevRecipe) => ({ ...prevRecipe, ingredients: newIngredients }));
  };

  // Add a new ingredient field
  const handleAddIngredient = () => {
    setRecipe((prevRecipe) => ({
      ...prevRecipe,
      ingredients: [...prevRecipe.ingredients, ""], // Add an empty string for a new ingredient
    }));
  };

  // Remove an ingredient field
  const handleRemoveIngredient = (index) => {
    const newIngredients = recipe.ingredients.filter((_, i) => i !== index);
    setRecipe((prevRecipe) => ({ ...prevRecipe, ingredients: newIngredients }));
  };

  // Handle category change from CategorySelector
  const handleCategoryChange = (selectedCategory) => {
    setRecipe((prevRecipe) => ({
      ...prevRecipe,
      category: selectedCategory,
    }));
  };

  const handleNationalityChange = (selectedNationality) => {
    setRecipe((prevRecipe) => {
      return { ...prevRecipe, cuisine: selectedNationality };
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateRecipe(recipeId, recipe);
      toast.success("Recipe updated successfully!");
    } catch (error) {
      toast.error("Error updating recipe:", error);
    }
  };

  return (
    <Container className='p-5' style={{ maxWidth: "800px", margin: "0 auto" }}>
      <ToastContainer />
      <Card>
        <Card.Body>
          <h2 className='sub-title'>Update Recipe</h2>

          <Form onSubmit={handleSubmit}>
            <Form.Group controlId='formTitle'>
              <Form.Label>Title</Form.Label>
              <Form.Control
                type='text'
                name='title'
                value={recipe.title}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId='formDescription' className='mt-4'>
              <Form.Label>Description</Form.Label>
              <Form.Control
                as='textarea'
                rows={3}
                name='description'
                value={recipe.description}
                onChange={handleChange}
                required
              />

              <Form.Group>
                <CountrySelector
                  onNationalityChange={handleNationalityChange}
                  selectedNationality={recipe.cuisine}
                />
              </Form.Group>

              <Form.Group className='mt-4'>
                <IngredientsUpdater
                  ingredients={recipe.ingredients}
                  onIngredientChange={handleIngredientChange}
                  onAddIngredient={handleAddIngredient}
                  onRemoveIngredient={handleRemoveIngredient}
                />
              </Form.Group>
            </Form.Group>

            <fieldset className='mb-4 border p-4'>
              <legend>Preparation Instruction</legend>
              <Row className='mb-2'>
                <Col>
                  {" "}
                  <Form.Group controlId='formPrepTime'>
                    <Form.Label>Preparation Time</Form.Label>
                    <Form.Control
                      type='number'
                      name='prepTime'
                      value={recipe.prepTime}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col>
                  {" "}
                  <Form.Group controlId='formCookTime'>
                    <Form.Label>Cooking Time</Form.Label>
                    <Form.Control
                      type='number'
                      name='cookTime'
                      value={recipe.cookTime}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                {" "}
                <Form.Group controlId='formInstructions'>
                  <legend>Preparation Note:</legend>
                  <Form.Control
                    as='textarea'
                    rows={3}
                    name='instructions'
                    value={recipe.instruction}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Row>
            </fieldset>

            {/* Use CategorySelector component */}
            <CategorySelector
              selectedCategory={recipe.category}
              onCategoryChange={handleCategoryChange}
              newCategory={newCategory}
              showNewCategoryInput={showNewCategoryInput}
              setNewCategory={setNewCategory}
              setShowNewCategoryInput={setShowNewCategoryInput}
            />

            <div className='d-flex gap-4'>
              <Link
                to={`/recipe/${recipe.id}/recipe-details`}
                className='btn btn-sm btn-secondary mt-3'
                style={{ backgroundColor: "#562f63b5" }}>
                <FaArrowLeft /> Back to recipe details
              </Link>

              <Button variant='secondary' type='submit' className='mt-3'>
                Update Recipe
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default RecipeUpdater;
