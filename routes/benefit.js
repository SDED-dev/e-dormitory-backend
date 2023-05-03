const r = require("express").Router();
const { body } = require("express-validator");
const auth = require($ + "/middleware/auth.js");

r.get(
  "/",
  auth(["admin", "dean", "commandant", "user"]),
  require($ + "/controllers/benefit/list")
);

r.post(
  "/create",
  auth(["admin"]),
  body("name").not().isEmpty().withMessage("Наіменування не вказано"),
  body("discount").isInt().withMessage("Знижка не вказана"),
  require($ + "/controllers/benefit/create")
);

r.patch(
  "/edit",
  auth(["admin"]),
  body("id").not().isEmpty().withMessage("ID не вказано"),
  body("name").not().isEmpty().withMessage("Наіменування не вказано"),
  body("discount").isInt().withMessage("Знижка не вказана"),
  require($ + "/controllers/benefit/edit")
);

r.patch(
  "/changeStatus",
  auth(["admin"]),
  body("id").not().isEmpty().withMessage("ID не вказано"),
  require($ + "/controllers/benefit/changeStatus")
);

module.exports = r;
