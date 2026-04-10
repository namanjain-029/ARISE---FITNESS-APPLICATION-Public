const express = require('express');
const router = express.Router();
const { getSummary, getSuggestions, getHeatmap } = require('../controllers/analyticsController');
const { protect } = require('../middleware/auth.middleware');

router.get('/summary', protect, getSummary);
router.get('/suggestions', protect, getSuggestions);
router.get('/heatmap', protect, getHeatmap);

module.exports = router;
