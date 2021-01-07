require("dotenv").config();

const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_SECRETKEY);

const stripeController = {
  createPaymentIntent: async (req, res) => {
    const { amount } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
    });

    res.json({ client_secret: paymentIntent.client_secret });
  },
};

module.exports = stripeController;
