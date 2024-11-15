import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import CarForm from './components/CarForm';
import CarDetail from './components/CarDetail';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected routes */}
        <Route
          path="/"
          element={<ProtectedRoute element={Home} />}
        />
         <Route path="/cars/:id"
        element={<ProtectedRoute element={CarDetail} />}
        />
        <Route
          path="/add"
          element={<ProtectedRoute element={CarForm} />}
        />
        <Route
          path="/edit/:id"
          element={<ProtectedRoute element={CarForm} />}
        />
        <Route
          path="/profile"
          element={<ProtectedRoute element={Profile} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
