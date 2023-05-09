const r = require("express").Router();
const { body } = require("express-validator");
const auth = require($ + "/middleware/auth.js");

r.get(
  "/",
  auth(["admin", "dean", "commandant", "user"]),
  require($ + "/controllers/course/list")
);

r.post(
  "/create",
  auth(["admin"]),
  body("name").not().isEmpty().withMessage("Наіменування не вказано"),
  require($ + "/controllers/course/create")
);

r.patch(
  "/edit",
  auth(["admin"]),
  body("id").not().isEmpty().withMessage("ID не вказано"),
  body("name").not().isEmpty().withMessage("Наіменування не вказано"),
  require($ + "/controllers/course/edit")
);

r.delete(
  "/",
  auth(["admin"]),
  body("id").not().isEmpty().withMessage("ID не вказано"),
  require($ + "/controllers/course/delete")
);

module.exports = r;
