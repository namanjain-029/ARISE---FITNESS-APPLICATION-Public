const User = require('../models/User');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

const registerUser = async (req, res) => {
    const { name, email, password, age, weight, height, goal } = req.body;
    try {
        const userExists = await User.findOne({ email });
        if (userExists) return res.status(400).json({ success: false, error: { message: 'User already exists' } });

        // Store password as plain text (dev/demo mode)
        const user = await User.create({ name, email, password, age, weight, height, goal });

        if (user) {
            res.status(201).json({
                success: true,
                data: {
                    token: generateToken(user._id),
                    user: { id: user._id, name: user.name, email: user.email, age: user.age, weight: user.weight, height: user.height, goal: user.goal }
                }
            });
        } else {
            res.status(400).json({ success: false, error: { message: 'Invalid user data' } });
        }
    } catch (error) {
        res.status(500).json({ success: false, error: { message: error.message } });
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        // Direct plain text comparison
        if (user && user.password === password) {
            res.json({
                success: true,
                data: {
                    token: generateToken(user._id),
                    user: { id: user._id, name: user.name, email: user.email, age: user.age, weight: user.weight, height: user.height, goal: user.goal }
                }
            });
        } else {
            res.status(401).json({ success: false, error: { message: 'Invalid credentials' } });
        }
    } catch (error) {
        res.status(500).json({ success: false, error: { message: error.message } });
    }
};

module.exports = { registerUser, loginUser };
