import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import RootLayout from "./components/layout/RootLayout";
import Home from "./components/home/Home";
import RecipeDetails from "./components/recipe/RecipeDetails";
import RecipeUpdater from "./components/recipe/RecipeUpdater";
import ImageUpdater from "./components/image/ImageUpdater";
import RecipeForm from "./components/recipe/RecipeForm";
import Login from "./components/auth/Login";
import Aboutus from "./components/Aboutus";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route
          path='/recipe/:recipeId/recipe-details'
          element={<RecipeDetails />}
        />
        <Route
          path='/update/:recipeId/update-recipe'
          element={<RecipeUpdater />}
        />

        <Route
          path='/update-image/:recipeId/update-image'
          element={<ImageUpdater />}
        />

        <Route path='/add-recipe' element={<RecipeForm />} />

        <Route path='/login' element={<Login />} />
        <Route path='/aboutus' element={<Aboutus />} />
      </Route>
    )
  );
  return <RouterProvider router={router} />;
}

export default App;
