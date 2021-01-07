const express = require("express");
const router = express.Router();
const shoes = require("../controllers/ShoesController");
const stripeController = require("../controllers/StripeController");

router.get("/api/items", shoes.getallShoes);

router.get("/api/items/:id", shoes.getOneShoe);

router.post("/api/item", shoes.addOneShoe);

router.post("/payment-intent", stripeController.createPaymentIntent);

module.exports = router;
