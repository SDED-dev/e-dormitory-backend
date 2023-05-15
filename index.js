const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT || 3000;
const bodyParser = require("body-parser");
const fs = require("fs");
const morgan = require("morgan");

global.$ = __dirname;

app.set("trust proxy", "loopback,uniquelocal");

morgan.token("remote-addr", (req) => {
  return (
    req.headers["x-forwarded-for"] ||
    req.headers["x-real-ip"] ||
    req.connection.remoteAddress
  );
});

app.use(
  morgan(
    ":remote-addr :method :url :status :res[content-length] - :response-time ms"
  )
);

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

app.use((req, res) => {
  res.status(444).end();
});

fs.promises.mkdir(process.env.STATIC_PATH + "/temp/", { recursive: true });
fs.promises.mkdir(process.env.STATIC_PATH + "/orders/", { recursive: true });

app.listen(port, () => {
  console.log(`e-dormitory listening on http://localhost:${port}`);
});
