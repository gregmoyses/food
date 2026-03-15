const { validationResult } = require('express-validator');
const asyncHandler = require('../utils/asyncHandler');
const { buildMealPlan } = require('../services/mealPlannerService');
const Preference = require('../models/Preference');

const generateMealPlan = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const criteria = req.body;
  const plan = buildMealPlan(criteria);
  res.json(plan);
});

const savePreferences = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const payload = { ...req.body, userId: req.user.id };
  const saved = await Preference.findOneAndUpdate({ userId: req.user.id }, payload, {
    new: true,
    upsert: true,
    setDefaultsOnInsert: true
  });

  res.status(201).json(saved);
});

module.exports = { generateMealPlan, savePreferences };
