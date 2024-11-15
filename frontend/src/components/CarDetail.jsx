import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getCarDetails } from '../api/api'; // Adjust import path accordingly

const CarDetail = () => {
  const { id } = useParams();  // Get the car ID from the URL
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        const response = await getCarDetails(id); // Use the getCarDetails API function
        setCar(response.data);
      } catch (err) {
        setError('Failed to fetch car details');
      } finally {
        setLoading(false);
      }
    };

    fetchCarDetails();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!car) return <p>Car not found!</p>;

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Banner */}
      <div className="bg-blue-600 text-white text-center py-8">
        <h1 className="text-4xl font-bold">Car Details</h1>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 p-8">
        {/* Image Slider (Left Side) */}
        <div className="w-full lg:w-1/2">
          <div className="relative">
            <div className="flex gap-4 overflow-x-auto py-4">
              {car.images && car.images.length > 0 ? (
                car.images.map((image, index) => (
                  <img
                    key={index}
                    src={`http://localhost:5000/${image}`} // Adjust based on your server setup
                    alt={`Car Image ${index + 1}`}
                    className="w-72 h-48 object-cover rounded-lg"
                  />
                ))
              ) : (
                <p>No images available for this car.</p>
              )}
            </div>
          </div>
        </div>

        {/* Car Details (Right Side) */}
        <div className="w-full lg:w-1/2">
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h3 className="text-3xl font-semibold text-gray-800">{car.title}</h3>
            <p className="text-gray-600 mt-4">{car.description}</p>

            <div className="mt-4">
              <h4 className="font-semibold text-gray-800">Tags</h4>
              <p className="text-gray-600">{car.tags}</p>
            </div>

            <div className="mt-4">
              <h4 className="font-semibold text-gray-800">Price</h4>
              <p className="text-gray-600">{car.price}</p>
            </div>

            <div className="mt-4">
              <h4 className="font-semibold text-gray-800">Other Details</h4>
              <p className="text-gray-600">{car.otherDetails}</p>
            </div>

            <div className="mt-8 flex justify-between">
              <a
                href={`/edit/${car._id}`}
                className="text-blue-500 hover:underline"
              >
                Edit
              </a>
              <button
                onClick={() => alert('Delete functionality here')}
                className="text-red-500 hover:text-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetail;
