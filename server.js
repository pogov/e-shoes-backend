require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const routes = require("./routes");
const port = 5500;

mongoose.connect(process.env.DATA_BASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", (err) => console.error(err));
db.once("open", () => console.log(`Connected to database: ${db.name}`));

const corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
};

const app = express();

app.use(cors(corsOptions));
app.use(express.json({ extended: false }));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "GET");
    return res.status(200).json({});
  }
  next();
});

app.use("/", routes);

app.listen(process.env.PORT || port, () =>
  console.log(`listen on port ${port}`),
);
