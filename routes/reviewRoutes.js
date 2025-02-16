import express from "express";
import {
    addReview,
    getReviewsByRestaurant,
    getReviewsByUser,
    updateReview,
    deleteReview,
} from "../controllers/reviewControllers.js";

const router = express.Router();

// Add a new review
router.post('/add', addReview);

// Get reviews for a specific restaurant
router.get('/restaurant/:restaurant_id', getReviewsByRestaurant);

// Get reviews by a specific user
router.get('/user/:user_id', getReviewsByUser);
 
// Update a review
router.put('/:id', updateReview);

// Delete a review
router.delete('/:id', deleteReview);

export { router as reviewRouter };
