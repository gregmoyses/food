const { validationResult } = require('express-validator');
const asyncHandler = require('../utils/asyncHandler');
const { respondToMealIdeaPrompt } = require('../services/chatService');

const chat = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { message, userContext } = req.body;
  const response = await respondToMealIdeaPrompt({ message, userContext });
  res.json(response);
});

module.exports = { chat };
