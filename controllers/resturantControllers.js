import Restaurant from "../models/resturantModel.js";
import { createCookies } from "../utils/cookies.js";
import { generateToken } from "../utils/token.js";


// Add a new restaurant
export const addRestaurant = async (req, res) => {
    try {


        const { name, adders, phone, rating, menu, operating_hours ,image} = req.body;

     

        const existingRestaurant = await Restaurant.findOne({ name });
        if (existingRestaurant) {
            return res.status(400).json({ error: "Name already exists" });
        }

        const newRestaurant = new Restaurant({
            name,
            image,
            adders,
            phone,
            rating,
            menu,
            operating_hours,
        });

        await newRestaurant.save();

        const token = generateToken(newRestaurant._id);
        createCookies(res, token);

        res.status(201).json({ message: "Restaurant added successfully", restaurant: newRestaurant });
    } catch (error) {

        console.log(error)
        res.status(500).json({ error: "Failed to add restaurant", details: error.message });
    }
};

// Get all restaurants
export const getAllRestaurants = async (req, res) => {
    try {
        const restaurants = await Restaurant.find();
        res.status(200).json(restaurants);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch restaurants", details: error.message });
    }
};

// Get a single restaurant by ID
export const getRestaurantById = async (req, res) => {
    try {
        const { id } = req.params;

        const restaurant = await Restaurant.findById(id);
        if (!restaurant) return res.status(404).json({ error: "Restaurant not found" });

        res.status(200).json(restaurant);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch restaurant", details: error.message });
    }
};

// Update restaurant details
export const updateRestaurant = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        let imageUrl = updates.image;
        if (req.file) {
            const cloudinaryResponse = await cloudinaryInstance.uploader.upload(req.file.path);
            imageUrl = cloudinaryResponse.secure_url;
        }

        const updatedRestaurant = await Restaurant.findByIdAndUpdate(
            id,
            { ...updates, image: imageUrl, updatedAt: new Date() },
            { new: true }
        );

        if (!updatedRestaurant) return res.status(404).json({ error: "Restaurant not found" });

        res.status(200).json({ message: "Restaurant updated successfully", restaurant: updatedRestaurant });
    } catch (error) {
        res.status(500).json({ error: "Failed to update restaurant", details: error.message });
    }
};

// Delete a restaurant
export const deleteRestaurant = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedRestaurant = await Restaurant.findByIdAndDelete(id);
        if (!deletedRestaurant) return res.status(404).json({ error: "Restaurant not found" });

        res.status(200).json({ message: "Restaurant deleted successfully", restaurant: deletedRestaurant });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete restaurant", details: error.message });
    }
};



export const fetchForSelectRestaurant = async(req, res)=>{
      try {
        console.log("working:")
        const restaurantList = await Restaurant.find({},"name")
        res.status(200).json(restaurantList);
      } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Failed to fetch restaurant", details: error.message }); 
      }
}