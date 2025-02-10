import { api } from "./api";

export const likeRecipe = async (recipeId) => {
  try {
    const response = await api.post(`/likes/recipe/${recipeId}/like`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const unLikeRecipe = async (recipeId) => {
  try {
    const response = await api.put(`/likes/recipe/${recipeId}/unLike`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getRecipeById = async (recipeId) => {
  try {
    const response = await api.get(`/recipes/${recipeId}/recipe`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAllRecipes = async () => {
  try {
    const response = await api.get(`/recipes`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAllCategories = async () => {
  try {
    const response = await api.get(`/recipes/categories`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAllCuisines = async () => {
  try {
    const response = await api.get(`/recipes/cuisines`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
