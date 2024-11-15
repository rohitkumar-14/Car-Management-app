import React, { useState, useEffect } from 'react';
import { getCars, deleteCar, searchCars } from '../api/api';
import { Link } from 'react-router-dom';

const Home = () => {
  const [cars, setCars] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const { data } = await getCars();
        setCars(data);
      } catch (error) {
        console.error('Error fetching cars', error);
      }
    };
    fetchCars();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteCar(id);
      setCars(cars.filter((car) => car._id !== id));
    } catch (error) {
      console.error('Error deleting car', error);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    const { data } = await searchCars(search);
    setCars(data);
  };

  return (
    <div className="min-h-screen bg-gray-100">
    {/* Page Header */}
    <div className="bg-blue-600 text-white text-center py-8">
      <h1 className="text-4xl font-bold">Car Management</h1>
    </div>

    {/* Search Form */}
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md mt-8">
      <form onSubmit={handleSearch} className="flex items-center space-x-4">
        <input
          type="text"
          placeholder="Search by title, description, or tags"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Search
        </button>
      </form>
    </div>

    {/* Add New Car Link */}
    <div className="text-center mt-4">
      <Link
        to="/add"
        className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700"
      >
        Add New Car
      </Link>
    </div>

    {/* Cars List */}
    <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
        {cars.map((car) => (
          <div key={car._id} className="bg-white shadow-lg rounded-lg overflow-hidden">
            {/* Image Slider */}
            {car.images && car.images.length > 0 && (
              <div className="relative">
                <div className="flex gap-4 overflow-x-auto py-4">
                  {car.images.slice(0, 3).map((image, index) => (
                    <img
                      key={index}
                      src={`http://localhost:5000/${image}`}
                      alt={`Car Image ${index + 1}`}
                      className="w-48 h-32 object-cover rounded-lg"
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Car Details */}
            <div className="p-6">
              <h3 className="text-2xl font-semibold text-gray-800 capitalize">{car.title}</h3>
              <p className="text-gray-600 mt-2">{car.description}</p>
              
            </div>

            {/* Action Buttons */}
            <div className="p-6 flex justify-between items-center border-t border-gray-200">
              <Link
                to={`/cars/${car._id}`}  
                className="text-blue-500 hover:underline"
              >
                View Details
              </Link>
              <Link
                to={`/edit/${car._id}`}
                className="text-yellow-500 hover:underline"
              >
                Edit
              </Link>
              <button
                onClick={() => handleDelete(car._id)}
                className="text-red-500 hover:text-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
  </div>
  );
};

export default Home;
