const express = require('express');
const router = express.Router();
const { getWorkouts, createWorkout } = require('../controllers/workoutController');
const { protect } = require('../middleware/auth.middleware');

router.route('/')
    .get(protect, getWorkouts)
    .post(protect, createWorkout);

module.exports = router;
