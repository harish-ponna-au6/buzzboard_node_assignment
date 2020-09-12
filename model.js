// NPM package
const { Schema, model } = require("mongoose");

// Schema
const orderSchema = new Schema(
  {
    order_id: {
      type: Number,
      required: true,
      unique: true,
    },
    item_name: {
      type: String,
      required: true,
    },
    cost: {
      type: Number,
      required: true,
    },
    order_date: {
      type: Date,
      required: true,
      default: Date.now,
    },
    delivery_date: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

const Order = model("order", orderSchema);

// Exporting Schema
module.exports = Order;
