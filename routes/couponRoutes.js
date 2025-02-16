import express from "express";
import {
    addCoupon,
    getAllCoupons,
    getCouponById,
    updateCoupon,
    deleteCoupon,
} from "../controllers/couponControllers.js";

const router = express.Router();

// Add a new coupon
router.post('/add', addCoupon);

// Get all coupons
router.get('/', getAllCoupons);

// Get a single coupon by ID
router.get('/:id', getCouponById);

// Update a coupon
router.put('/:id', updateCoupon);

// Delete a coupon
router.delete('/:id', deleteCoupon);

export { router as couponRouter };
