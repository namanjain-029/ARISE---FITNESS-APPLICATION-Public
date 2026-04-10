const Workout = require('../models/Workout');
const Meal = require('../models/Meal');

const getSummary = async (req, res) => {
    try {
        const today = new Date().toISOString().split('T')[0];
        
        const mealsToday = await Meal.find({ userId: req.user._id, date: { $regex: today } });
        const workoutsToday = await Workout.find({ userId: req.user._id, date: { $regex: today } });

        const caloriesConsumed = mealsToday.reduce((acc, m) => acc + m.calories, 0);
        const caloriesBurned = workoutsToday.reduce((acc, w) => acc + w.caloriesBurned, 0);
        const waterMl = workoutsToday.reduce((acc, w) => acc + (w.waterMl || 0), 0);

        res.json({
            success: true,
            data: {
                date: today,
                caloriesConsumed,
                caloriesBurned,
                netCalories: caloriesConsumed - caloriesBurned,
                workoutsToday: workoutsToday.length,
                waterMl
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, error: { message: error.message } });
    }
};

const getSuggestions = async (req, res) => {
    try {
        const today = new Date().toISOString().split('T')[0];
        const lastWorkout = await Workout.findOne({ userId: req.user._id }).sort({ createdAt: -1 });
        const lastMeal = await Meal.findOne({ userId: req.user._id }).sort({ createdAt: -1 });
        const workoutsToday = await Workout.find({ userId: req.user._id, date: { $regex: today } });
        const totalCaloriesBurned = workoutsToday.reduce((acc, w) => acc + w.caloriesBurned, 0);
        const totalWaterMl = workoutsToday.reduce((acc, w) => acc + (w.waterMl || 0), 0);

        // --- Main Suggestion Logic ---
        let suggestion = {
            action: "INITIALIZE SYSTEM",
            message: "Awaiting your first resource intake or training session. Start logging to recalibrate your stats.",
            quest: null,
            questReason: null
        };

        if (lastWorkout && (!lastMeal || lastWorkout.createdAt > lastMeal.createdAt)) {
            if (lastWorkout.caloriesBurned > 400) {
                suggestion = {
                    action: "RECOVERY MEAL REQUIRED",
                    message: `Intense ${lastWorkout.type} session detected. Refuel with high-protein food to repair muscle fibers and restore Mana.`,
                    quest: {
                        id: 2,
                        title: "Dungeon Preparation: Core",
                        xp: "250 XP",
                        tasks: ["5m Plank", "50 Leg Raises", "100 Russian Twists"]
                    },
                    questReason: "After intense training, a lighter core session tomorrow will prevent injury and boost Endurance."
                };
            } else {
                suggestion = {
                    action: "MILD TRAINING COMPLETE",
                    message: `Light activity logged (${lastWorkout.caloriesBurned} kcal). Maintain hydration${totalWaterMl < 500 ? ` — only ${totalWaterMl}ml logged, aim for 2000ml` : ` (${totalWaterMl}ml — good!)`} and consider a balanced vitality snack.`,
                    quest: {
                        id: 1,
                        title: "Daily Strength Training",
                        xp: "100 XP",
                        tasks: ["100 Push-ups", "100 Sit-ups", "100 Squats", "10km Run"]
                    },
                    questReason: `You burned ${lastWorkout.caloriesBurned} kcal. Take on the Daily Strength quest to push above the 400 kcal threshold and unlock S-rank recovery suggestions.`
                };
            }
        } else if (lastMeal) {
            if (lastMeal.calories > 400) {
                suggestion = {
                    action: "CALORIC SURGE DETECTED",
                    message: `Heavy '${lastMeal.foodName}' intake detected. Engage in High-Intensity Training to optimize energy conversion before it's stored as fat.`,
                    quest: {
                        id: 3,
                        title: "Elite Hunter Cardio",
                        xp: "500 XP",
                        tasks: ["5km Sprint (< 20m)", "20 Burpees x 5 sets", "Jump Rope 10m"]
                    },
                    questReason: `${lastMeal.calories} kcal consumed. The Elite Cardio quest burns 600 kcal — perfect to offset this meal and boost Agility.`
                };
            } else {
                suggestion = {
                    action: "SUSTAINED ENERGY",
                    message: "Optimal light resource intake. Your energy levels are stable. Prepare for your next Shadow Dungeon mission.",
                    quest: {
                        id: 2,
                        title: "Dungeon Preparation: Core",
                        xp: "250 XP",
                        tasks: ["5m Plank", "50 Leg Raises", "100 Russian Twists"]
                    },
                    questReason: "With stable energy, now is the ideal time for focused core training — it burns less fuel but maximizes Endurance stat gain."
                };
            }
        }

        res.json({ success: true, data: suggestion });
    } catch (error) {
        res.status(500).json({ success: false, error: { message: error.message } });
    }
};

const getHeatmap = async (req, res) => {
    try {
        const endDate = new Date();
        const startDate = new Date();
        startDate.setDate(endDate.getDate() - 150); // Parse last ~5 months

        // Find meals and workouts in date range
        const workouts = await Workout.find({
            userId: req.user._id,
            createdAt: { $gte: startDate, $lte: endDate }
        });
        
        const meals = await Meal.find({
            userId: req.user._id,
            createdAt: { $gte: startDate, $lte: endDate }
        });

        const counts = {};

        workouts.forEach(w => {
            const d = w.createdAt.toISOString().split('T')[0];
            counts[d] = (counts[d] || 0) + 1;
        });

        meals.forEach(m => {
            // Check if m.createdAt exists, some old mocks might just have m.date
            const d = (m.createdAt ? m.createdAt : new Date(m.date)).toISOString().split('T')[0];
            counts[d] = (counts[d] || 0) + 1;
        });

        // Convert dict to array of { date, count }
        const heatmapData = Object.keys(counts).map(key => ({
            date: key,
            count: counts[key]
        }));

        res.json({ success: true, data: heatmapData });
    } catch (error) {
        res.status(500).json({ success: false, error: { message: error.message } });
    }
};

module.exports = { getSummary, getSuggestions, getHeatmap };
