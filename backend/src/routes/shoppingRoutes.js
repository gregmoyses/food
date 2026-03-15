const express = require('express');
const { body } = require('express-validator');
const authMiddleware = require('../middleware/authMiddleware');
const { parseList, addToRetailerBasket } = require('../controllers/shoppingController');

const router = express.Router();

router.post('/parse', [body('inputText').isString().notEmpty()], parseList);
router.post(
  '/retailer/basket',
  authMiddleware,
  [body('retailer').isString().notEmpty(), body('items').isArray({ min: 1 })],
  addToRetailerBasket
);

module.exports = router;
