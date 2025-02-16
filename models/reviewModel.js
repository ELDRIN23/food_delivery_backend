import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema({
    user_id: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    restaurant_id: {type: mongoose.Schema.Types.ObjectId, ref: "resturant", required: true},
    username: { type: String },
    photo: { type: String },
    description: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Boolean, default: false },
});

export const Review = mongoose.model("Review", ReviewSchema);
