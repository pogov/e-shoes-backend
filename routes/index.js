const express = require("express");
const router = express.Router();
const shoes = require("../controllers/ShoesController");

router.get("/api/items", shoes.getallShoes);

router.get("/api/items/:id", shoes.getOneShoe);

router.post("/api/item", shoes.addOneShoe);

module.exports = router;
