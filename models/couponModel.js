import mongoose from 'mongoose';

const CouponSchema = new mongoose.Schema({
    //id: { type: String, required: true },
    discount_value: { type: String, required: true },
    amount: { type: Number, required: true },
    user_limit: { type: String },
    expiry_date: { type: String, required: true },
    isActive: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: null },
});

export const Coupon = mongoose.model('Coupon', CouponSchema);
