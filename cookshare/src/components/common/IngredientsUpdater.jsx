import React from 'react'
import { Row, Col, Form } from "react-bootstrap"
import {FaPlus} from "react-icons/fa"

const IngredientsUpdater = ({
  ingredients,
  onIngredientChange,
  onAddIngredient,
  onRemoveIngredient,
}) => {

    
    return (
      <fieldset className='border p-4'>
        <legend>Ingredients</legend>
        <hr />

        {ingredients.map((ingredient, index) => (
          <Row key={index} className='mb-2 align-items-center'>
            <Col xs={10}>
              <Form.Control
                type='text'
                placeholder={`Ingredient ${index + 1}`}
                value={ingredient}
                onChange={(e) => onIngredientChange(index, e.target.value)}
                required
              />
            </Col>

            {index > 0 && (
              <Col xs={2}>
                <span
                  style={{ cursor: "pointer", color: "red" }}
                  onClick={() => onRemoveIngredient(index)}>
                  Remove
                </span>
              </Col>
            )}
          </Row>
        ))}

        <div className='mb-4'>
          <span
            style={{ cursor: "pointer", color: "blue" }}
            onClick={onAddIngredient}>
            <FaPlus /> Add Ingredient
          </span>
        </div>
      </fieldset>
    );
};

export default IngredientsUpdater
