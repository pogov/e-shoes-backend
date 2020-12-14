const mongoose = require("mongoose");

const ShoeSchema = mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  sizes: {
    type: [Number],
    required: true,
  },
  tags: {
    type: [String],
    required: true,
  },
  imgSrc: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("shoe", ShoeSchema);
