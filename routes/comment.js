const r = require("express").Router();
const { body } = require("express-validator");
const auth = require($ + "/middleware/auth.js");

r.post(
  "/create",
  auth(["admin", "moderator"]),
  body("order").isInt().withMessage("Заяву не вказано"),
  body("content").not().isEmpty().withMessage("Коментар не вказано"),
  require($ + "/controllers/order/comment/create")
);

module.exports = r;
