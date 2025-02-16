import { Coupon } from "../models/couponModel.js";

// Add a new coupon
export const addCoupon = async (req, res) => {
    try {
        const { discount_value, amount, user_limit, expiry_date } = req.body;

        const newCoupon = new Coupon({
            discount_value,
            amount,
            user_limit,
            expiry_date,
        });

        await newCoupon.save();
        res.status(201).json({ message: "Coupon added successfully", coupon: newCoupon });
    } catch (error) {
        res.status(500).json({ error: "Failed to add coupon", details: error.message });
    }
};

// Get all coupons
export const getAllCoupons = async (req, res) => {
    try {
        const coupons = await Coupon.find();
        res.status(200).json(coupons);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch coupons", details: error.message });
    }
};

// Get a single coupon by ID
export const getCouponById = async (req, res) => {
    try {
        const { id } = req.body;

        const coupon = await Coupon.findOne({ id });
        if (!coupon) return res.status(404).json({ error: "Coupon not found" });

        res.status(200).json(coupon);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch coupon", details: error.message });
    }
};

// Update coupon details
export const updateCoupon = async (req, res) => {
    try {
        const { id } = req.body;
        const updates = req.body;

        const updatedCoupon = await Coupon.findOneAndUpdate(
            { id },
            { ...updates, updatedAt: new Date() },
            { new: true }
        );

        if (!updatedCoupon) return res.status(404).json({ error: "Coupon not found" });

        res.status(200).json({ message: "Coupon updated successfully", coupon: updatedCoupon });
    } catch (error) {
        res.status(500).json({ error: "Failed to update coupon", details: error.message });
    }
};

// Delete a coupon
export const deleteCoupon = async (req, res) => {
    try {
        const { id } = req.body;

        const deletedCoupon = await Coupon.findOneAndDelete({ id });
        if (!deletedCoupon) return res.status(404).json({ error: "Coupon not found" });

        res.status(200).json({ message: "Coupon deleted successfully", coupon: deletedCoupon });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete coupon", details: error.message });
    }
};
