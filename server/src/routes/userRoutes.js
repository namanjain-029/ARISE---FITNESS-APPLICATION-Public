const express = require('express');
const router = express.Router();
const { getUserProfile, updateUserProfile, processCheckout } = require('../controllers/userController');
const { protect } = require('../middleware/auth.middleware');

router.route('/me')
    .get(protect, getUserProfile)
    .put(protect, updateUserProfile);

router.post('/checkout', protect, processCheckout);

module.exports = router;
