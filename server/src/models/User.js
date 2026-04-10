const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // Will store bcrypt hash
    age: { type: Number },
    weight: { type: Number },
    height: { type: Number },
    goal: { type: String },
    isPremium: { type: Boolean, default: false },
    inventory: { type: Array, default: [] }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
