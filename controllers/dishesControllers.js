import { Dishes } from "../models/dishesModel.js";
import Restaurant from "../models/resturantModel.js";

// Add a new dish
export const addDish = async (req, res) => {
    try {
        const {restaurant_id, name,  rating, price, description, availability,image } = req.body;

        const newDish = new Dishes({
            restaurant_id,
            name,
           image,
            rating,
            price,
            description,
            availability:availability==="yes",
        });

        await newDish.save();
        res.status(201).json({ message: "Dish added successfully", dish: newDish });
    } catch (error) {
      console.log(error)
        res.status(500).json({ error: "Failed to add dish", details: error.message });
    }
};

// Get all dishes
export const getAllDishes = async (req, res) => {
    try {
        const dishes = await Dishes.find().populate("restaurant_id");
        res.status(200).json(dishes);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch dishes", details: error.message });
    }
};

// Get dishes by restaurant ID
export const getDishesByRestaurant = async (req, res) => {
    try {
        const { restaurant_id } = req.params;

        const dishes = await Dishes.find({ restaurant_id });
        if (dishes.length === 0) return res.status(404).json({ error: "No dishes found for this restaurant" });

        res.status(200).json(dishes);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch dishes", details: error.message });
    }
};

// Update dish details
export const updateDish = async (req, res) => {
  const { id } = req.params;
  const { name, rating, price } = req.body; // Extract updated fields

  try {
    const updatedDish = await Dishes.findByIdAndUpdate(
      id, 
      { name, rating, price }, 
      { new: true } // Returns the updated document
    );

    if (!updatedDish) {
      return res.status(404).json({ message: "Dish not found" });
    }

    res.json({ message: "Dish updated successfully", dish: updatedDish });
  } catch (err) {
    console.error("Error updating dish:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Delete a dish
export const deleteDish = async (req, res) => {
    try {
      console.log("entered del fn")
        const { dishId } = req.params; // Get dish ID from request parameters
        const deletedDish = await Dishes.findByIdAndDelete(dishId); // Use "Dishes" instead of "Dish"
        
        if (!deletedDish) {
            return res.status(404).json({ message: "Dish not found" });
        }
        
        res.status(200).json({ message: "Dish deleted successfully" });
    } catch (error) {
        console.error("Error deleting dish:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }

};



//Dish details
// export const getDishDetails = async (req, res) => {
//     try {
//         const { id } = req.params;
//         console.log(id);
//         const dish = await Dishes.findById(id);
        
//         if (!dish) {
//             return res.status(404).json({ message: "Dish not found" });
//         }

//         res.status(200).json(dish);
//     } catch (error) {
//         res.status(500).json({ error: "Failed to fetch dish details", details: error.message });
//     }
// };


export const fetchRestaurantWiseDishes = async (req, res) => {
    try {
      const restaurantsWithDishes = await Restaurant.aggregate([
        {
          $lookup: {
            from: "dishes",
            localField: "_id",
            foreignField: "restaurant_id",
            as: "dishes",
          },
        },
        {
          $match: {
            "dishes.0": { $exists: true }, // Ensure at least 1 dish exists
          },
        },
      
        {
          $project: {
            _id: 1,
            name: 1,
            image: 1,
            adders: 1,
            phone: 1,
            rating: 1,
            menu: 1,
            role: 1,
            operating_hours: 1,
            createdAt: 1,
            updatedAt: 1,
            dishes: 1,
          },
        },
      ]);
  
      res.status(200).json({ success: true, data: restaurantsWithDishes });
    } catch (error) {
      console.error("Error fetching restaurant-wise dishes:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
  
  