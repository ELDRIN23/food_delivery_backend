import mongoose from "mongoose";

const DishesSchema = new mongoose.Schema({
   // dish_id: { type: String, required: true },
    restaurant_id: { type: mongoose.Schema.Types.ObjectId, ref: "Restaurant", required: true},
    name: { type: String, required: true },
   image: { type: [String] },
    rating: { type: Number },
    price: { type: Number, required: true },
    description: { type: String },
    availability: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Boolean, default: false },
});

export const Dishes = mongoose.model("Dishes", DishesSchema);
