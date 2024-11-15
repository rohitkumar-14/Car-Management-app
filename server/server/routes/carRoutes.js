const express = require('express');
const { addCar, getAllCars, getCarDetails, updateCar, deleteCar, searchCars, upload } = require('../controllers/carController');
const protect = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/add', protect, upload, addCar);
router.get('/list', protect, getAllCars);
router.get('/search', protect, searchCars);
router.get('/:id', protect, getCarDetails);
router.put('/:id', protect, upload, updateCar);
router.delete('/:id', protect, deleteCar);

module.exports = router;
