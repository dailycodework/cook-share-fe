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

export const addNewOrUpdateReview = async ({ recipeId, reviewInfo }) => {  
  try {
    const response = await api.post(
      `/reviews/recipe/${recipeId}/review`,
      reviewInfo
    );
    return response;
  } catch (error) {
    throw error;
  }
};


export const deleteReview = async ({ ratingId, recipeId }) => {
  try {
    const response = await api.delete(`/reviews/delete`, {
      params: {
        ratingId,
        recipeId,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const updateRecipe = async (recipeId, recipe) => {
  try {
    const response = await api.put(`/recipes/${recipeId}/update`, recipe);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteRecipe = async ({ recipeId }) => {
  try {
    const response = await api.delete(`/recipes/${recipeId}/delete`);
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const uploadImage = async ({ recipeId, file }) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("recipeId", recipeId);
  try {
    const response = await api.post("/images/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const updateImage = async ({ imageId, file }) => {
  const formData = new FormData();
  formData.append("file", file);
  try {
    const response = await api.put(`/images/image/${imageId}/update`, formData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addRecipe = async (recipeData) => {
  try {
    const response = await api.post("/recipes", recipeData);
    return response.data;
  } catch (error) {
    throw error;
  }
};



export const getUser = async (username) => {
  try {
    const response = await api.get("/users", {
      params: { username },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};






