import express from "express";
import {
    addDish,
    getAllDishes,
    getDishesByRestaurant,
    updateDish,
    deleteDish,
    // getDishDetails,
} from "../controllers/dishesControllers.js";
import { processUpload } from "../config/cloudinaryConfig.js";

const router = express.Router();

// Add a new dish
router.post('/add',processUpload, addDish);

// Get all dishes
router.get('/', getAllDishes);

//get dish details
// router.get("/dishDetails/:id", getDishDetails);

// Get dishes by restaurant ID
router.get('/:restaurant_id', getDishesByRestaurant);

// Update a dish
router.put('/:id', updateDish);

// Delete a dish
router.delete('/:id', deleteDish);

export {router as dishesRouter};
