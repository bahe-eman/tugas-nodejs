const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { sequelize } = require("./models");

const router = require("./routers");

const app = express();
const port = process.env.SERVER_PORT;
const hostname = process.env.DATABASE_HOST;

sequelize
  .authenticate()
  .then((error) => {
    console.log("database connection has been established successfully");
  })
  .catch((error) => {
    console.log("connection error", error);
  });

app.use(cors({ origin: true }));
app.use(express.json());
app.use("/", router);

app.listen(port, hostname, () => {
  console.log(`Server Running on ${hostname}:${port}`);
});
