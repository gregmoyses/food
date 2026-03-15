const mongoose = require('mongoose');

const purchaseHistorySchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    retailer: { type: String, required: true },
    items: [{ name: String, quantity: Number, unit: String }],
    totalCost: Number,
    purchasedAt: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

module.exports = mongoose.model('PurchaseHistory', purchaseHistorySchema);
