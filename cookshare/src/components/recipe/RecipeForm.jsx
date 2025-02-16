import React, { useState } from "react";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import CountrySelector from "../common/CountrySelector";
import IngredientsUpdater from "../common/IngredientsUpdater";
import CategorySelector from "../common/CategorySelector";
import { toast, ToastContainer } from "react-toastify";
import { addRecipe } from "../services/RecipeService";
import { Stepper, Step, StepLabel } from "@mui/material";
import ImageUploader from "../image/ImageUploader";
import { useLocation } from "react-router-dom";

const RecipeForm = () => {
  const [showNewCategoryInput, setShowNewCategoryInput] = useState(false);
    const [newCategory, setNewCategory] = useState("");
    
     const [activeStep, setActiveStep] = useState(0);
     const steps = ["Add New Recipe Details", "Add Recipe Image"];
  const [recipeId, setRecipeId] = useState(null);
  
   const location = useLocation();
   const { username } = location.state || {};

  const [formData, setFormData] = useState({
    title: "",
    prepTime: "",
    cookTime: "",
    category: "",
    description: "",
    nationality: "",
    instructions: "",
    ingredients: [""],
    username: username,
  });

  const handleIngredientChange = (index, value) => {
    const newIngredients = [...formData.ingredients];
    newIngredients[index] = value;
    setFormData((prev) => ({ ...prev, ingredients: newIngredients }));
  };

  const addIngredientField = () => {
    setFormData((prev) => ({
      ...prev,
      ingredients: [...prev.ingredients, ""],
    }));
  };

  const removeIngredientField = (index) => {
    const newIngredients = formData.ingredients.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, ingredients: newIngredients }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCategoryChange = (category) => {
    setFormData({ ...formData, category });
    if (category === "New") {
      setShowNewCategoryInput(true);
    } else {
      setShowNewCategoryInput(false);
    }
  };

  const handleNationalityChange = (nationality) => {
    setFormData({ ...formData, nationality });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const recipeData = {
      recipe: {
        title: formData.title,
        prepTime: formData.prepTime,
        cookTime: formData.cookTime,
        category: formData.category,
        description: formData.description,
        cuisine: formData.nationality,
        instructions: formData.instructions,
        ingredients: formData.ingredients,
      },
      user: {
        username: formData.username,
      },
    };

    try {
      const result = await addRecipe(recipeData);
     setRecipeId(result.id);
      toast.success("Recipe added successfully!");
      resetForm();
      setActiveStep(1);
    } catch (error) {
      toast.error("Failed to add recipe: " + error.message);
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      prepTime: "",
      cookTime: "",
      category: "",
      description: "",
      nationality: "",
      instructions: "",
      ingredients: [""],
      username: "",
    });
    };
    

     const handlePreviousStep = () => {
       setActiveStep((prevStep) => Math.max(prevStep - 1, 0));
     };

  return (
    <Container className='p-5' style={{ maxWidth: "800px", margin: "0 auto" }}>
      <ToastContainer />
      <div className='border p-4'>
        <h2 className='sub-title'>Share Your Recipe</h2>
        <hr />

        <Stepper activeStep={activeStep} alternativeLabel className='m-4'>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {activeStep === 0 && (
          <Form onSubmit={handleSubmit}>
            <Row>
              <Form.Group>
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type='text'
                  name='title'
                  placeholder='Enter recipe title'
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Row>

            <Row className='mb-3'>
              <Form.Group controlId='formDescription'>
                <legend>About Recipe</legend>
                <Form.Control
                  as='textarea'
                  rows={2}
                  name='description'
                  placeholder='Give some information about this recipe'
                  value={formData.description}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Row>

            <CountrySelector
              selectedNationality={formData.nationality}
              onNationalityChange={handleNationalityChange}
            />

            <IngredientsUpdater
              ingredients={formData.ingredients}
              onIngredientChange={handleIngredientChange}
              onAddIngredient={addIngredientField}
              onRemoveIngredient={removeIngredientField}
            />

            <fieldset className='border p-4 mb-4'>
              <legend>Preparation Instructions</legend>
              <hr />
              <Row className='mb-3'>
                <Col xs={12} md={6}>
                  <Form.Group controlId='formPrepTime'>
                    <Form.Label>Preparation Time</Form.Label>
                    <Form.Control
                      type='number'
                      name='prepTime'
                      placeholder='Enter preparation time in minutes'
                      value={formData.prepTime}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Col>

                <Col xs={12} md={6}>
                  <Form.Group controlId='formCookTime'>
                    <Form.Label>Cooking Time</Form.Label>
                    <Form.Control
                      type='number'
                      name='cookTime'
                      placeholder='Enter cooking time in minutes'
                      value={formData.cookTime}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row className='mb-3'>
                <Form.Group controlId='formInstructions'>
                  <Form.Label>Note:</Form.Label>
                  <Form.Control
                    as='textarea'
                    rows={2}
                    name='instructions'
                    placeholder='Enter additional information'
                    value={formData.instructions}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Row>
            </fieldset>

            <Row className='mb-4'>
              <CategorySelector
                selectedCategory={formData.category}
                onCategoryChange={handleCategoryChange}
                showNewCategoryInput={showNewCategoryInput}
                setShowNewCategoryInput={setShowNewCategoryInput}
                newCategory={newCategory}
                setNewCategory={setNewCategory}
              />
            </Row>
            <Button type='submit' variant='outline-secondary'>
              Submit Recipe
            </Button>
          </Form>
        )}

        {activeStep === 1 && (
          <fieldset className='border p-4 mb-4'>
            <legend className='sub-titles'>Upload image for this recipe</legend>
            <Row className='mb-3'>
              <ImageUploader recipeId={recipeId} />
            </Row>
            <Button variant='outline-secondary' onClick={handlePreviousStep}>
              Previous
            </Button>
          </fieldset>
        )}
      </div>
    </Container>
  );
};

export default RecipeForm;
