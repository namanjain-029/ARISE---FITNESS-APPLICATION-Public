const Meal = require('../models/Meal');

const getMeals = async (req, res) => {
    try {
        const meals = await Meal.find({ userId: req.user._id }).sort({ createdAt: -1 });
        res.json({ success: true, data: { meals } });
    } catch (error) {
        res.status(500).json({ success: false, error: { message: error.message } });
    }
};

const createMeal = async (req, res) => {
    const { foodName, calories, protein, carbs, fats, mealType, date } = req.body;
    try {
        const meal = await Meal.create({
            userId: req.user._id,
            foodName,
            calories,
            protein,
            carbs,
            fats,
            mealType,
            date
        });
        res.status(201).json({ success: true, data: { meal } });
    } catch (error) {
        res.status(400).json({ success: false, error: { message: error.message } });
    }
};

module.exports = { getMeals, createMeal };
