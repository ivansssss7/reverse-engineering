const mongoose = require("mongoose");

const sparePartSchema = mongoose.Schema({
  system: { // engine, brakes, body ...
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  manufacturer: {
    type: String,
    required: true,
  },
  modelId: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'carModel'
    }
  ],
  price: {
    type: Number,
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    default: 0
  },
  discount: {
    type: Number,
    required: true,
    default: 0
  },
  picture: {
    type: String,
    required: false
  },
  specification: {
    type: String,
    required: false
  },
  country: {
    type: String,
    required: false
  }
}, { timestamps: true });

module.exports = mongoose.model("sparePart", sparePartSchema);
