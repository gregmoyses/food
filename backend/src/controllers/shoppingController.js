const { validationResult } = require('express-validator');
const asyncHandler = require('../utils/asyncHandler');
const { parseShoppingList } = require('../services/shoppingParserService');
const { getAdapter } = require('../services/retailerService');
const PurchaseHistory = require('../models/PurchaseHistory');

const parseList = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { inputText } = req.body;
  const items = parseShoppingList(inputText);
  res.json({ items });
});

const addToRetailerBasket = asyncHandler(async (req, res) => {
  const { retailer, items, autoPurchase = false } = req.body;
  const adapter = getAdapter(retailer);

  const basket = await adapter.addToBasket(items);
  let purchaseResult = null;

  if (autoPurchase) {
    purchaseResult = await adapter.purchase(basket.basketId);
    await PurchaseHistory.create({
      userId: req.user.id,
      retailer,
      items,
      totalCost: null
    });
  }

  res.json({ basket, purchaseResult });
});

module.exports = { parseList, addToRetailerBasket };
