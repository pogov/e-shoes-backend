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

const app = express();

app.use(cors());
app.use(express.json({ extended: false }));
app.use("/", routes);

app.listen(process.env.PORT || port, () =>
  console.log(`listen on port ${port}`),
);
