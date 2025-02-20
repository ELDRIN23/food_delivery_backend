import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  user: {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: { type: String },
    email: { type: String },
    phone: { type: String },
    address: { type: String },
  },

  items: [
    {
      dish_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Dishes",
        required: true,
      },
      dish_name: { type: String, required: true },
      quantity: { type: Number, required: true, min: 1 },
      price_per_item: { type: Number, required: true },
    },
  ],

  total_amount: { type: Number, required: true }, // Total order price

  payment_status: {
    type: String,
    enum: ["pending", "completed", "failed", "refunded"],
    default: "pending",
  },

  payment_id: { type: String, default: null }, // Stripe payment ID

  order_status: {
    type: String,
    enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
    default: "pending",
  },

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: null },
});

export const Order = mongoose.model("Order", OrderSchema);
