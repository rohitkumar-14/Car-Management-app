import React, { useState, useEffect } from 'react';
import { addCar, updateCar, getCars } from '../api/api';
import { useNavigate, useParams } from 'react-router-dom';

const CarForm = ({ isEdit = false }) => {
  const [carData, setCarData] = useState({
    title: '',
    description: '',
    tags: '',
    images: [],
  });
  const navigate = useNavigate();
  const { id } = useParams();

  // Handle image file input
  const handleFileChange = (e) => {
    setCarData({ ...carData, images: e.target.files });
  };

  // Fetch existing car data for editing
  useEffect(() => {
    if (isEdit) {
      const fetchCar = async () => {
        const response = await getCars();
        const car = response.data.find((car) => car._id === id);
        setCarData(car);
      };
      fetchCar();
    }
  }, [isEdit, id]);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCarData({ ...carData, [name]: value });
  };

  // Handle form submission (send data including images as FormData)
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', carData.title);
    formData.append('description', carData.description);
    formData.append('tags', carData.tags);
    
    // Append images if any
    for (let i = 0; i < carData.images.length; i++) {
      formData.append('images', carData.images[i]);
    }

    // Submit the form data
    if (isEdit) {
      await updateCar(id, formData);
    } else {
      await addCar(formData);
    }

    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-100">
    {/* Banner Section */}
    <div className="bg-blue-600 text-white py-8">
      <h1 className="text-3xl font-bold text-center">Welcome to Car Listing</h1>
      <p className="text-center text-lg">Add or Update your car details below</p>
    </div>

    {/* Form Section */}
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md mt-8">
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="mb-4">
          <input
            type="text"
            name="title"
            placeholder="Car Title"
            value={carData.title}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <textarea
            name="description"
            placeholder="Car Description"
            value={carData.description}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            name="tags"
            placeholder="Tags"
            value={carData.tags}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <input
            type="file"
            name="images"
            multiple
            onChange={handleFileChange}
            className="w-full border border-gray-300 rounded-md py-2"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          {isEdit ? 'Update Car' : 'Add Car'}
        </button>
      </form>
    </div>
  </div>
  );
};

export default CarForm;
