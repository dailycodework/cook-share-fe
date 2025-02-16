import React, { useState, useRef } from "react";
import { Form } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import { updateImage, uploadImage } from "../services/RecipeService";

const ImageUploader = ({ recipeId, existingImageId }) => {
  const fileInputRef = useRef(null);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleImageUpload = async (e) => {
    e.preventDefault();
    if (!image) {
      toast.warn("Please select an image.");
      return;
    }
    try {
      let result;
      if (existingImageId) { 
        console.log("Image already exists")
        result = await updateImage({ imageId: existingImageId, file: image });
        toast.success("Image updated successfully");
        clearFileInput();
      } else {  
         console.log("New Image");
        result = await uploadImage({ recipeId, file: image });
        toast.success(result.message);
        clearFileInput();
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const clearFileInput = () => {
    if (fileInputRef.current) fileInputRef.current.value = null;
    setImage(null);
    setPreview("");
  };

  return (
    <Form onSubmit={handleImageUpload}>
      <ToastContainer />

      <div className='mb-4'></div>
      <div className='mb-4 mt-4'>
        <div className='mt-2 mb-2'>
          <div className='d-flex align-items-center mb-2 input-group'>
            <input
              type='file'
              accept='image/*'
              onChange={handleImageChange}
              className='me-2 form-control'
              ref={fileInputRef}
            />
          </div>
        </div>

        {preview && (
          <div className='image-preview mb-4'>
            <img src={preview} alt='Image Preview' />
          </div>
        )}

        <button type='submit' className='btn btn-outline-secondary btn-sm'>
          Upload Image
        </button>
      </div>
    </Form>
  );
};

export default ImageUploader;
