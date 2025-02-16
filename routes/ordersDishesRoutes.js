import express from "express";
import {
    addOrderedDish,
    getAllOrderedDishes,
    getOrderedDishesByUser,
    getOrderedDishesByRestaurant,
    updateOrderedDishStatus,
    deleteOrderedDish
} from "../controllers/ordersDishesControllers.js";

const router = express.Router();

router.post("/ordered-dishes", addOrderedDish);
router.get("/ordered-dishes", getAllOrderedDishes);
router.get("/ordered-dishes/user/:user_id", getOrderedDishesByUser);
router.get("/ordered-dishes/restaurant/:resturant_id", getOrderedDishesByRestaurant);
router.put("/ordered-dishes/:ordered_id", updateOrderedDishStatus);
router.delete("/ordered-dishes/:ordered_id", deleteOrderedDish);

export default router;


export { router as orderedDishesRouter };
