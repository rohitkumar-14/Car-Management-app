import React from 'react';
import { Link } from 'react-router-dom';

const CarDetails = ({ car, onDelete }) => {
  return (
    <div className="max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
    {/* Car Title and Description */}
    <div className="p-6">
      <h3 className="text-2xl font-semibold text-gray-800">{car.title}</h3>
      <p className="text-gray-600 mt-2">{car.description}</p>
    </div>

    {/* Car Images */}
    {car.images && car.images.length > 0 ? (
      <div className="p-6 border-t border-gray-200">
        <h4 className="text-xl font-semibold text-gray-800">Car Images</h4>
        <div className="flex gap-4 mt-4 overflow-x-auto">
          {car.images.map((image, index) => (
            <img
              key={index}
              src={`http://localhost:5000/${image}`}
              alt={`Car Image ${index + 1}`}
              className="w-32 h-32 object-cover rounded-lg"
            />
          ))}
        </div>
      </div>
    ) : (
      <div className="p-6 border-t border-gray-200">
        <p className="text-gray-600">No images available for this car.</p>
      </div>
    )}

    {/* Edit and Delete Buttons */}
    <div className="p-6 flex justify-between items-center border-t border-gray-200">
      <Link to={`/edit/${car._id}`} className="text-blue-500 hover:underline">
        Edit
      </Link>
      <button
        onClick={() => onDelete(car._id)}
        className="text-red-500 hover:text-red-700"
      >
        Delete
      </button>
    </div>
  </div>
  );
};

export default CarDetails;
