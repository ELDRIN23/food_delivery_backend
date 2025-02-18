import express from "express";
import { 
  addItemToCart, 
  getCartItems, 
  updateCartItem, 
  removeCartItem, 
  clearCart 
} from "../controllers/cartControllers.js";
import { userAthmiddleware } from "../middlewares/userAuth.js";

const router = express.Router();

// Add an item to the cart
router.post('/add', userAthmiddleware, addItemToCart);

// Get all items in the cart
router.get('/', userAthmiddleware, getCartItems);

// Update item quantity in the cart
router.put('/update/:itemId', userAthmiddleware, updateCartItem);

// Remove an item from the cart
router.delete('/delete/:dish_id', userAthmiddleware, removeCartItem);

// Clear the entire cart
router.delete('/clear', userAthmiddleware, clearCart);

export { router as cartRouter };
