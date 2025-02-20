import express from 'express';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const paymentRoute = express.Router(); 

paymentRoute.post("/generate-payment-intent", async (req, res) => {
    try {
        const { amount } = req.body; // No need to get `currency` from request
console.log(typeof amount, amount,)
        // Validate required fields
        if (!amount || typeof amount !== "number" || amount <= 0) {
            return res.status(400).json({ error: "Amount must be a positive number." });
        }

        const paymentIntent = await stripe.paymentIntents.create({
            amount : amount * 100,
            currency: "inr", // Fixed currency
        });

        res.json({ clientSecret: paymentIntent.client_secret });

    } catch (error) {
        console.error("Error creating payment intent:", error);
        res.status(500).json({ error: error.message });
    }
});

export default paymentRoute;
