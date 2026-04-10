const User = require('../models/User');

const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select('-password');
        if (user) {
            res.json({ success: true, data: { user } });
        } else {
            res.status(404).json({ success: false, error: { message: 'User not found' } });
        }
    } catch (error) {
        res.status(500).json({ success: false, error: { message: error.message } });
    }
};

const updateUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        if (user) {
            user.name = req.body.name || user.name;
            user.age = req.body.age || user.age;
            user.weight = req.body.weight || user.weight;
            user.height = req.body.height || user.height;
            user.goal = req.body.goal || user.goal;

            const updatedUser = await user.save();
            res.json({ success: true, data: { user: { id: updatedUser._id, name: updatedUser.name, email: updatedUser.email, age: updatedUser.age, weight: updatedUser.weight, height: updatedUser.height, goal: updatedUser.goal } } });
        } else {
            res.status(404).json({ success: false, error: { message: 'User not found' } });
        }
    } catch (error) {
        res.status(500).json({ success: false, error: { message: error.message } });
    }
};

// POST /api/user/checkout
// Saves a product purchase or premium upgrade to the user's DB record
const processCheckout = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(404).json({ success: false, error: { message: 'User not found' } });
        }

        const { type, item } = req.body; // type: 'premium' | 'item'

        if (type === 'premium') {
            user.isPremium = true;
        } else if (type === 'item' && item) {
            // Avoid duplicate purchases
            const alreadyOwned = user.inventory.some(i => i.id === item.id);
            if (!alreadyOwned) {
                user.inventory.push({
                    id: item.id,
                    name: item.name,
                    type: item.type,
                    stats: item.stats,
                    rarity: item.rarity,
                    price: item.price,
                    purchasedAt: new Date()
                });
            }
        }

        const updatedUser = await user.save();
        // Return the full updated user (without password)
        const safeUser = updatedUser.toObject();
        delete safeUser.password;

        res.json({ success: true, data: { user: safeUser } });
    } catch (error) {
        res.status(500).json({ success: false, error: { message: error.message } });
    }
};

module.exports = { getUserProfile, updateUserProfile, processCheckout };
