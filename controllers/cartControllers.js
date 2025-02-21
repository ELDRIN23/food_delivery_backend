import { Cart } from "../models/cartModel.js";
import mongoose from "mongoose";

/**
 * Add an item to the cart
 */
export const addItemToCart = async (req, res) => {
  try {
    const { dish_id, dish_name, quantity, price_per_item } = req.body;
    const user_id = req.user._id;
    // Find the cart for the user
    let cart = await Cart.findOne({ user_id });

    if (cart) {
      // Check if the dish already exists in the cart
      const dishIndex = cart.dishes.findIndex(
        (dish) => dish.dish_id.toString() === dish_id
      );

      if (dishIndex > -1) {
        // Update existing dish's quantity and price
        cart.dishes[dishIndex].quantity += quantity;
        cart.dishes[dishIndex].price_per_item = price_per_item; // Update the price if needed
      } else {
        // Add new dish to the cart
        cart.dishes.push({ dish_id, dish_name, quantity, price_per_item });
      }
    } else {
      // Create a new cart for the user
      cart = new Cart({
        user_id,
        dishes: [{ dish_id, dish_name, quantity, price_per_item }],
      });
    }

    // Calculate the total_amount
    cart.total_amount = cart.dishes.reduce(
      (sum, dish) => sum + dish.quantity * dish.price_per_item,
      0
    );
    await cart.save();

    res.status(201).json(cart);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({
        error: "Failed to add item to the cart.",
        details: error.message,
      });
  }
};

/**
 * Get all items in the cart
 */
export const getCartItems = async (req, res) => {
  try {
    const user_id = req.user._id;
    const cart = await Cart.findOne({ user_id }).populate({
      path: "dishes.dish_id",
      select: "name image price",
    });

    if (!cart) {
      return res.status(404).json({ error: "Cart not found." });
    }

    res.status(200).json(cart);
  } catch (error) {
    res
      .status(500)
      .json({
        error: "Failed to retrieve cart items.",
        details: error.message,
      });
  }
};

/**
 * Update an item in the cart
 */
export const updateCartItem = async (req, res) => {
  try {
    const { user_id, dish_id, quantity, price_per_item } = req.body;

    const cart = await Cart.findOne({ user_id });
    if (!cart) {
      return res.status(404).json({ error: "Cart not found." });
    }

    const dishIndex = cart.dishes.findIndex(
      (dish) => dish.dish_id.toString() === dish_id
    );
    if (dishIndex === -1) {
      return res.status(404).json({ error: "Dish not found in cart." });
    }

    cart.dishes[dishIndex].quantity = quantity;
    cart.dishes[dishIndex].price_per_item = price_per_item; // Update the price if needed

    // Calculate the total_amount
    cart.total_amount = cart.dishes.reduce(
      (sum, dish) => sum + dish.quantity * dish.price_per_item,
      0
    );
    cart.updatedAt = new Date();

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to update cart item.", details: error.message });
  }
};

/**
 * Remove an item from the cart
 */
export const removeCartItem = async (req, res) => {
  try {
    console.log("Entered removeCartItem function");
    const { dish_id } = req.params;
    const user_id = req.user.id; // Assuming user authentication

    if (!mongoose.Types.ObjectId.isValid(dish_id)) {
      return res.status(400).json({ error: "Invalid dish_id format." });
    }

    const cart = await Cart.findOneAndUpdate(
      { user_id }, // Ensure correct cart selection
      { $pull: { dishes: { dish_id: new mongoose.Types.ObjectId(dish_id) } } },
      { new: true }
    );

    if (!cart) {
      return res.status(404).json({ error: "Cart not found." });
    }

    // Recalculate total_amount
    cart.total_amount = cart.dishes.reduce(
      (total, item) => total + item.quantity * item.price_per_item,
      0
    );
    await cart.save();

    res.status(200).json({ message: "Item removed from cart.", cart });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to remove cart item.", details: error.message });
  }
};

/**
 * Clear all items in the cart
 */
export const clearCart = async (req, res) => {
  try {
    const user_id = req.body.user_id; // Logged-in user ID

    await Cart.findOneAndUpdate(
      { user_id },
      { dishes: [], total_amount: 0, updatedAt: new Date() }
    );
    res.status(200).json({ message: "Cart cleared." });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to clear cart.", details: error.message });
  }
};
