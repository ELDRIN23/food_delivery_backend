import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const generatePaymentIntent = async (req, res) => {
    try {
        const { amount } = req.body;
        console.log(typeof amount, amount);

        // Validate amount
        if (!amount || typeof amount !== "number" || amount <= 0) {
            return res.status(400).json({ error: "Amount must be a positive number." });
        }

        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount * 100, // Convert to cents/paise
            currency: "inr",
        });

        res.json({ clientSecret: paymentIntent.client_secret });

    } catch (error) {
        console.error("Error creating payment intent:", error);
        res.status(500).json({ error: error.message });
    }
};
