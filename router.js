const r = require("express").Router();

r.use("/user", require("./routes/user.js"));
r.use("/order", require("./routes/order.js"));
r.use("/static", require("./routes/static.js"));

module.exports = r;
