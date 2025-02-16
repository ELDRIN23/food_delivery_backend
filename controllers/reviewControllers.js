import { Review } from "../models/reviewModel.js"

// Add a new review
export const addReview = async (req, res) => {
    try {
        const { user_id, restaurant_id, username, photo, description } = req.body;

        const newReview = new Review({
            user_id,
            restaurant_id,
            username,
            photo,
            description,
        });

        await newReview.save();
        res.status(201).json({ message: "Review added successfully", review: newReview });
    } catch (error) {
        res.status(500).json({ error: "Failed to add review", details: error.message });
    }
};

// Get all reviews for a specific restaurant
export const getReviewsByRestaurant = async (req, res) => {
    try {
        const { restaurant_id } = req.body;

        const reviews = await Review.find({ restaurant_id });
        if (reviews.length === 0) return res.status(404).json({ error: "No reviews found for this restaurant" });

        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch reviews", details: error.message });
    }
};

// Get reviews by user ID
export const getReviewsByUser = async (req, res) => {
    try {
        const { user_id } = req.body;

        const reviews = await Review.find({ user_id });
        if (reviews.length === 0) return res.status(404).json({ error: "No reviews found for this user" });

        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch reviews", details: error.message });
    }
};

// Update a review
export const updateReview = async (req, res) => {
    try {
        const { id } = req.body;
        const updates = req.body;

        const updatedReview = await Review.findByIdAndUpdate(
            id,
            { ...updates, updatedAt: new Date() },
            { new: true }
        );

        if (!updatedReview) return res.status(404).json({ error: "Review not found" });

        res.status(200).json({ message: "Review updated successfully", review: updatedReview });
    } catch (error) {
        res.status(500).json({ error: "Failed to update review", details: error.message });
    }
};

// Delete a review
export const deleteReview = async (req, res) => {
    try {
        const { id } = req.body;

        const deletedReview = await Review.findByIdAndDelete(id);
        if (!deletedReview) return res.status(404).json({ error: "Review not found" });

        res.status(200).json({ message: "Review deleted successfully", review: deletedReview });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete review", details: error.message });
    }
};
