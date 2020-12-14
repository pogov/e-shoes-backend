const Shoe = require("../models/Shoe");

const shoes = {
  getallShoes: async (req, res) => {
    try {
      const shoes = await Shoe.find();
      res.json(shoes);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  },
  getOneShoe: async (req, res) => {
    try {
      const shoe = await Shoe.findById(req.params.id);
      res.json(shoe);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  },
  addOneShoe: async (req, res) => {
    const { type, name, price, description, tags, sizes, imgSrc } = req.body;
    const shoe = new Shoe({
      type,
      name,
      price,
      description,
      sizes,
      tags,
      imgSrc,
    });

    try {
      const newShoe = shoe.save();
      res.status(201).json(newShoe);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
};

module.exports = shoes;
