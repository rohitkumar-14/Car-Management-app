import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const logout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <nav className="flex items-center justify-between p-4 bg-gray-800 text-white">
      <div className="text-xl font-bold">
        <Link to="/">Car Rental</Link>
      </div>
      <div className="space-x-4">
        <Link to="/" className="hover:text-teal-300">Home</Link>
        {localStorage.getItem('token') ? (
          <button onClick={logout} className="bg-red-500 px-4 py-2 rounded text-white hover:bg-red-600">Logout</button>
        ) : (
          <>
            <Link to="/login" className="hover:text-teal-300">Login</Link>
            <Link to="/signup" className="hover:text-teal-300">Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
