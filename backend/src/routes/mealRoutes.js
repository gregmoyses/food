const express = require('express');
const { body } = require('express-validator');
const authMiddleware = require('../middleware/authMiddleware');
const { generateMealPlan, savePreferences } = require('../controllers/mealController');

const router = express.Router();

router.post(
  '/plan',
  [body('calories').optional().isNumeric(), body('protein').optional().isNumeric()],
  generateMealPlan
);

router.post('/preferences', authMiddleware, [body('macroTargets').optional().isObject()], savePreferences);

module.exports = router;
