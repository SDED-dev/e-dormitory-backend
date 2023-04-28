const r = require("express").Router();
const { body } = require("express-validator");
const auth = require($ + "/middleware/auth.js");

r.post(
  "/create",
  auth(["admin"]),
  body("name").not().isEmpty().withMessage("Наіменування не вказано"),
  require($ + "/controllers/faculties/create")
);

r.post(
  "/edit",
  auth(["admin"]),
  body("id").not().isEmpty().withMessage("ID не вказано"),
  body("name").not().isEmpty().withMessage("Наіменування не вказано"),
  require($ + "/controllers/faculties/edit")
);

module.exports = r;
