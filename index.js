const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT || 3000;
const bodyParser = require("body-parser");

global.$ = __dirname;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors({ origin: "*" }));

app.use("/v0", require("./router.js"));

app.listen(port, () => {
  console.log(`App listening on http://localhost:${port}`);
});
