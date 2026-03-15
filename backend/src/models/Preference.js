const mongoose = require('mongoose');

const preferenceSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    macroTargets: {
      calories: Number,
      protein: Number,
      carbs: Number,
      fats: Number
    },
    microTargets: {
      fiber: Number,
      iron: Number,
      calcium: Number,
      vitaminC: Number
    },
    defaultHealthyOptions: { type: Boolean, default: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Preference', preferenceSchema);
