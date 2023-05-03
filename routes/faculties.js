const r = require("express").Router();
const { body } = require("express-validator");
const auth = require($ + "/middleware/auth.js");

r.get(
  "/",
  auth(["admin", "dean", "commandant", "user"]),
  require($ + "/controllers/faculties/list")
);

r.post(
  "/create",
  auth(["admin"]),
  body("name").not().isEmpty().withMessage("Наіменування не вказано"),
  require($ + "/controllers/faculties/create")
);

r.patch(
  "/edit",
  auth(["admin"]),
  body("id").not().isEmpty().withMessage("ID не вказано"),
  body("name").not().isEmpty().withMessage("Наіменування не вказано"),
  require($ + "/controllers/faculties/edit")
);

module.exports = r;
