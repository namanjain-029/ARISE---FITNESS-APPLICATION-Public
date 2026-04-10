const express = require('express');
const router = express.Router();
const { getMeals, createMeal } = require('../controllers/mealController');
const { protect } = require('../middleware/auth.middleware');

router.route('/')
    .get(protect, getMeals)
    .post(protect, createMeal);

module.exports = router;
