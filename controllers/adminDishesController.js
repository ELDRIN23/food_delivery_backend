import { Dishes } from "../models/dishesModel.js";

export const fetchDishesForAdmin = async (req, res) => {
  try {
    const dishes = await Dishes.find().populate("restaurant_id");

    return res.status(200).json(dishes); // Send response
  } catch (error) {
    console.error("Error fetching dishes:", error);
    return res.status(500).json({ error: "Failed to fetch dishes" });
  }
};
