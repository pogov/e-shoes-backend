const Shoe = require("../models/Shoe");

const shoes = {
  getallShoes: async (req, res) => {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const result = {};

    if (endIndex < (await Shoe.countDocuments().exec())) {
      result.next = {
        page: page + 1,
        limit,
      };
    }
    result.left = (await Shoe.find()).length - endIndex;

    if (startIndex > 0) {
      result.previous = {
        page: page - 1,
        limit,
      };
    }

    try {
      result.shoes = await Shoe.find().limit(limit).skip(startIndex).exec();
      res.status(201).json(result);
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
