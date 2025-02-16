import { OrderedDishes } from "../models/odersDishesModel.js";

// Add a new ordered dish
export const addOrderedDish = async (req, res) => {
    try {
   // console.log("test");
    
        const { user_id, dish_id, resturant_id, dish_name, total_amount, phone } = req.body;

        const newOrderedDish = new OrderedDishes({
            user_id,
            dish_id,
            resturant_id,
            dish_name,
            total_amount,
            phone,
        });

        await newOrderedDish.save();
        res.status(201).json({ message: "Ordered dish added successfully", orderedDish: newOrderedDish });
    } catch (error) {
        res.status(500).json({ error: "Failed to add ordered dish", details: error.message });
    }
};

// Get all ordered dishes
export const getAllOrderedDishes = async (req, res) => {
    try {
        const orderedDishes = await OrderedDishes.find();
        res.status(200).json(orderedDishes);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch ordered dishes", details: error.message });
    }
};

// Get ordered dishes by user ID
export const getOrderedDishesByUser = async (req, res) => {
    try {
        const { user_id } = req.params;

        const orderedDishes = await OrderedDishes.find({ user_id });
        if (orderedDishes.length === 0) return res.status(404).json({ error: "No orders found for this user" });

        res.status(200).json(orderedDishes);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch ordered dishes", details: error.message });
    }
};

// Get ordered dishes by restaurant ID
export const getOrderedDishesByRestaurant = async (req, res) => {
    try {
        const { restaurant_id } = req.params;

        const orderedDishes = await OrderedDishes.find({ resturant_id: restaurant_id });
        if (orderedDishes.length === 0) return res.status(404).json({ error: "No orders found for this restaurant" });

        res.status(200).json(orderedDishes);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch ordered dishes", details: error.message });
    }
};

// Update ordered dish status
export const updateOrderedDishStatus = async (req, res) => {
    try {
        const { ordered_id } = req.params;
        const { status } = req.body;

        const updatedOrderedDish = await OrderedDishes.findOneAndUpdate(
            { ordered_id },
            { status, updatedAt: new Date() },
            { new: true }
        );

        if (!updatedOrderedDish) return res.status(404).json({ error: "Ordered dish not found" });

        res.status(200).json({ message: "Ordered dish status updated successfully", orderedDish: updatedOrderedDish });
    } catch (error) {
        res.status(500).json({ error: "Failed to update ordered dish status", details: error.message });
    }
};

// Delete an ordered dish
export const deleteOrderedDish = async (req, res) => {
    try {
        const { ordered_id } = req.params;

        const deletedOrderedDish = await OrderedDishes.findOneAndDelete({ ordered_id });
        if (!deletedOrderedDish) return res.status(404).json({ error: "Ordered dish not found" });

        res.status(200).json({ message: "Ordered dish deleted successfully", deletedOrderedDish });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete ordered dish", details: error.message });
    }
};