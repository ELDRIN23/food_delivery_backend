import mongoose from "mongoose";

const CartSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  dishes: [
    {
      dish_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Dishes",
        required: true,
      },
      dish_name: { type: String, required: true },
      quantity: { type: Number, required: true }, // Minimum quantity = 1
      price_per_item: { type: Number, required: true },
    },
  ],
  total_amount: { type: Number, required: true }, // Calculated total = quantity * price_per_item
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: null }, // Updated timestamp
});

export const Cart = mongoose.model("Cart", CartSchema);
