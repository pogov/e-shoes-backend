const Shoe = require("../models/Shoe");

async function findShoe(queryValue, startIndex, endIndex, page, limit, res) {
  const result = {};

  if (queryValue !== "undefined") {
    //
    const regex = new RegExp(`${queryValue}`, "gi");

    if (endIndex < (await Shoe.find({ name: regex }).countDocuments().exec())) {
      result.next = {
        page: page + 1,
        limit,
      };
    }
    result.left = (await Shoe.find({ name: regex })).length - endIndex;
    if (startIndex > 0) {
      result.previous = {
        page: page - 1,
        limit,
      };
    }

    try {
      const schemaQuery = Shoe.find({ name: regex })
        .limit(limit)
        .skip(startIndex);
      schemaQuery.getFilter();
      result.shoes = await schemaQuery.exec();
      res.status(201).json(result);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
    return;
  }

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
  } catch (error) {
    res.status(404).json({ message: err.message });
  }
}

const shoes = {
  getallShoes: (req, res) => {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const query = req.query.query;

    console.log(query);

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    findShoe(query, startIndex, endIndex, page, limit, res);
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
