const mongoose = require("mongoose");

const carModelSchema = mongoose.Schema({
  brandId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'brands'
  },
  model: {
    required: true,
    type: String
  },
  year: {
    required: true,
    type: Number
  },
  carBody: {
    required: true,
    type: String
  },
  carEngine: {
    required: true,
    type: String
  },
  enginePower: {
    required: true,
    type: String
  }
}, { timestamps: true });

module.exports = mongoose.model("carModel", carModelSchema);
