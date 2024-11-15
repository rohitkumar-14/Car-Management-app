const Car = require('../models/Car');
const multer = require('multer');
const path = require('path');

// Multer configuration for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage }).array('images', 10);

const addCar = async (req, res) => {
  const { title, description, tags } = req.body;
  try {
    const car = new Car({
      title,
      description,
      tags,
      images: req.files.map(file => file.path),
      owner: req.user._id,
    });

    await car.save();
    res.status(201).json(car);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const getAllCars = async (req, res) => {
  try {
    const cars = await Car.find({ owner: req.user._id });
    res.json(cars);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const getCarDetails = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car || car.owner.toString() !== req.user._id.toString()) {
      return res.status(404).json({ message: 'Car not found' });
    }
    res.json(car);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const updateCar = async (req, res) => {
  const { title, description, tags } = req.body;
  try {
    const car = await Car.findById(req.params.id);
    if (!car || car.owner.toString() !== req.user._id.toString()) {
      return res.status(404).json({ message: 'Car not found' });
    }

    car.title = title || car.title;
    car.description = description || car.description;
    car.tags = tags || car.tags;
    if (req.files) {
      car.images = req.files.map(file => file.path);
    }

    await car.save();
    res.json(car);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const deleteCar = async (req, res) => {
  try {
    const car = await Car.findByIdAndDelete(req.params.id);
    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }
    res.status(200).json({ message: 'Car deleted successfully' });
  } catch (error) {
    console.error('Error deleting car:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const searchCars = async (req, res) => {
  const keyword = req.query.keyword || '';
  try {
    const cars = await Car.find({
      owner: req.user._id,
      $or: [
        { title: { $regex: keyword, $options: 'i' } },
        { description: { $regex: keyword, $options: 'i' } },
        { tags: { $regex: keyword, $options: 'i' } },
      ],
    });
    res.json(cars);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { addCar, getAllCars, getCarDetails, updateCar, deleteCar, searchCars, upload };
