const express = require("express");
require("dotenv").config();

const router = require("./routers");

const app = express();
const port = process.env.SERVER_PORT;
const hostname = process.env.DATABASE_HOST;

app.use(express.json());
app.use("/", router);

app.listen(port, hostname, () => {
  console.log(`Server Running on ${hostname}:${port}`);
});
