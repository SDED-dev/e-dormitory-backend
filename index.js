const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT || 3000;
const bodyParser = require("body-parser");
const fs = require("fs");

global.$ = __dirname;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const origin = process.env.CORS?.split(",");

app.use(
  cors({
    credentials: true,
    origin,
  })
);

app.use("/v0", require("./router.js"));

fs.promises.mkdir(process.env.STATIC_PATH + "/temp/", { recursive: true });
fs.promises.mkdir(process.env.STATIC_PATH + "/orders/", { recursive: true });

app.listen(port, () => {
  console.log(`App listening on http://localhost:${port}`);
});
