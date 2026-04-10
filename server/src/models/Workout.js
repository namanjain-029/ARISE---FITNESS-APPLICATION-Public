const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, required: true },
    duration: { type: Number, required: true },
    caloriesBurned: { type: Number, required: true },
    date: { type: String, required: true },
    notes: { type: String },
    waterMl: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Workout', workoutSchema);
