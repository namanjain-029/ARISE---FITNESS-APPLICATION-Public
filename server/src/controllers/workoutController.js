const Workout = require('../models/Workout');

const getWorkouts = async (req, res) => {
    try {
        const workouts = await Workout.find({ userId: req.user._id }).sort({ createdAt: -1 });
        res.json({ success: true, data: { workouts } });
    } catch (error) {
        res.status(500).json({ success: false, error: { message: error.message } });
    }
};

const createWorkout = async (req, res) => {
    const { type, duration, caloriesBurned, date, notes, waterMl } = req.body;
    try {
        const parsedDuration = Number(duration);
        const parsedCalories = Number(caloriesBurned);

        if (!type || isNaN(parsedDuration) || isNaN(parsedCalories) || !date) {
            return res.status(400).json({ success: false, error: { message: 'Missing or invalid required fields.' } });
        }

        const workout = await Workout.create({
            userId: req.user._id,
            type,
            duration: parsedDuration,
            caloriesBurned: parsedCalories,
            date,
            notes: notes || '',
            waterMl: Number(waterMl) || 0
        });
        res.status(201).json({ success: true, data: { workout } });
    } catch (error) {
        res.status(400).json({ success: false, error: { message: error.message } });
    }
};

module.exports = { getWorkouts, createWorkout };
