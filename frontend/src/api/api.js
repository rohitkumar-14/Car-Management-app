import axios from 'axios';

// Set up the base URL for API
const API_URL = 'http://localhost:5000/api';

// Function to set the JWT token in the request headers
const setAuthHeader = () => {
  const token = localStorage.getItem('token');
  if (token) {
    axios.defaults.headers['Authorization'] = `Bearer ${token}`;
  }
};

// API calls
export const registerUser = async (userData) => {
  return axios.post(`${API_URL}/auth/register`, userData);
};

export const loginUser = async (userData) => {
  return axios.post(`${API_URL}/auth/login`, userData);
};

export const getCars = async () => {
  setAuthHeader();
  return axios.get(`${API_URL}/cars/list`);
};

export const addCar = async (carData) => {
  setAuthHeader();
  return axios.post(`${API_URL}/cars/add`, carData);
};
// Function to get car details by ID
export const getCarDetails = async (id) => {
  setAuthHeader();
  return axios.get(`${API_URL}/cars/${id}`);
};


export const updateCar = async (id, carData) => {
  setAuthHeader();
  return axios.put(`${API_URL}/cars/${id}`, carData);
};

export const deleteCar = async (id) => {
  setAuthHeader();
  return axios.delete(`${API_URL}/cars/${id}`);
};

export const searchCars = async (keyword) => {
  setAuthHeader();
  return axios.get(`${API_URL}/cars/search?keyword=${keyword}`);
};
