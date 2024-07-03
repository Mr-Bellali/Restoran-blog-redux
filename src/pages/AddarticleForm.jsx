import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddPhotoAlternateRoundedIcon from "@mui/icons-material/AddPhotoAlternateRounded";
import axios from "axios";
import { fetchCategories } from "../slices/categoriesSlice";
import { addArticle } from "../slices/articlesSlice";

const cloudinaryUrl = "https://api.cloudinary.com/v1_1/dmoosgavw/image/upload";
const cloudinaryPreset = "ndvxj3sl"; // Replace with your actual upload preset name

const AddarticleForm = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.items);
  const [imageUrl, setImageUrl] = useState(""); // State to store the image URL

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleFileSelect = async (e) => {
    const file = e.target.files[0];
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", cloudinaryPreset); // Use the preset name

      const response = await axios.post(cloudinaryUrl, formData);
      const uploadedImageUrl = response.data.secure_url;
      setImageUrl(uploadedImageUrl); // Set the image URL in state

      console.log("Uploaded Image URL:", uploadedImageUrl);
    } catch (error) {
      console.error("Error uploading image to Cloudinary: ", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const article = {
      id: "",
      title: formData.get("articleName"),
      category_id: formData.get("category"),
      description: formData.get("description"),
      ingredients: formData.get("ingredient").split("\n"), // Convert to array
      cook_method: formData.get("method"),
      image: imageUrl, // Use the image URL from Cloudinary
    };

    dispatch(addArticle(article));
    alert("Article created successfully!");
  };

  return (
    <div className="w-full h-full">
      <form onSubmit={handleSubmit} className="p-4 flex flex-col items-center">
        <div className="w-full h-fit flex flex-col mb-4">
          <label htmlFor="articleName" className="text-lg">
            Article Title
          </label>
          <input
            type="text"
            id="articleName"
            name="articleName"
            className="border-[1px] border-gray-300 bg-gray-100 rounded-[5px] h-[40px] p-2 text-lg"
            placeholder="Enter article name"
            required
          />
        </div>
        <div className="w-full h-fit flex flex-col mb-4">
          <label htmlFor="category" className="text-lg">
            Category
          </label>
          <select
            id="category"
            name="category"
            className="border-[1px] border-gray-300 bg-gray-100 rounded-[5px] h-[40px] p-2 text-lg"
            required
          >
            <option value="">Select category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div className="w-full h-fit flex flex-col mb-4">
          <label htmlFor="description" className="text-lg">
            Description
          </label>
          <input
            type="text"
            id="description"
            name="description"
            className="border-[1px] border-gray-300 bg-gray-100 rounded-[5px] h-[40px] p-2 text-lg"
            placeholder="Enter description"
            required
          />
        </div>
        <div className="w-full h-fit flex flex-col mb-4">
          <label htmlFor="ingredient" className="text-lg">
            Ingredients
          </label>
          <textarea
            id="ingredient"
            name="ingredient"
            rows={4}
            className="border-[1px] border-gray-300 bg-gray-100 rounded-[5px] p-2 text-lg"
            placeholder="Enter ingredients"
            required
          />
        </div>
        <div className="w-full h-fit flex flex-col mb-4">
          <label htmlFor="method" className="text-lg">
            How to make it
          </label>
          <textarea
            id="method"
            name="method"
            rows={4}
            className="border-[1px] border-gray-300 bg-gray-100 rounded-[5px] p-2 text-lg"
            placeholder="Enter method"
            required
          />
        </div>
        
        {/* Hidden file input */}
        <input
          type="file"
          id="image"
          name="image"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleFileSelect}
        />

        <div className="w-full h-fit flex flex-col mb-4 items-end">
          <label htmlFor="image" className="text-lg">
            Add a photo
          </label>
          <label htmlFor="image" className="cursor-pointer mt-2">
            <AddPhotoAlternateRoundedIcon />
          </label>
          {imageUrl && (
            <img src={imageUrl} alt="Uploaded" className="mt-4 max-h-40" />
          )}
        </div>
        
        <button
          type="submit"
          className="w-full h-[50px] bg-gray-700 text-white text-lg rounded-[5px]"
        >
          Create Article
        </button>
      </form>
    </div>
  );
};

export default AddarticleForm;
