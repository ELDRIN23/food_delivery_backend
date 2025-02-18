import { Dishes } from "../models/dishesModel.js";

export const fetchDishesForAdmin = async () => {
  try {
    const dishes = await Dishes.find().populate("restaurant_id", "name"); // Fetch restaurant name
    return dishes;
  } catch (error) {
    console.error("Error fetching dishes:", error);
    throw error;
  }
};
