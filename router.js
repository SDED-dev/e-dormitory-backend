const r = require("express").Router();

r.use("/user", require("./routes/user.js"));
r.use("/order", require("./routes/order.js"));
r.use("/faculties", require("./routes/faculties.js"));
r.use("/dormitory", require("./routes/dormitory.js"));
r.use("/rooms", require("./routes/rooms.js"));
r.use("/benefit", require("./routes/benefit.js"));
r.use("/static", require("./routes/static.js"));
r.use("/checkTime", require("./routes/checkTime.js"));
r.use("/course", require("./routes/course.js"));
r.use("/export", require("./routes/export.js"));

module.exports = r;
