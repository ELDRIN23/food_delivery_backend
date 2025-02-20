import { Cart } from "../models/cartModel.js";
import { Order } from "../models/orderModel.js";

export const createOrder = async (req, res) => {
    try {
        const userId = req.user._id; // Extract user ID from authenticated request
        
        // Fetch user's cart
        const cart = await Cart.findOne({ user_id: userId });

        if (!cart || cart.dishes.length === 0) {
            return res.status(400).json({ message: "Cart is empty, cannot create an order." });
        }

        // Create a new order
        const newOrder = new Order({
            user: {
                user_id: userId,
                name: req.user.name,
                email: req.user.email,
                phone: req.user.phone,
                address: req.user.address,
            },
            items: cart.dishes, // Copy cart items into order
            total_amount: cart.total_amount,
            payment_status: "completed",
            order_status: "pending",
        });

        await newOrder.save(); // Save order in DB

        // Clear user's cart after order is placed
        await Cart.deleteOne({ user_id: userId });

        res.status(201).json({
            message: "Order created successfully!",
            order: newOrder,
        });
    } catch (error) {
        console.error("Error creating order:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};



export const fetchOrderDetails = async (req, res) => {
    try {
        const userId = req.user._id; // Extract user ID from authenticated request

        // Fetch all orders for the user
        const orders = await Order.find({ "user.user_id": userId });

        if (!orders.length) {
            return res.status(404).json({ message: "No orders found for this user." });
        }

        res.status(200).json({ success: true, orders , user : req.user});
    } catch (error) {
        console.error("Error fetching orders:", error);
        res.status(500).json({ success: false, error: "Internal server error" });
    }
};