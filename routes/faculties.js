const r = require("express").Router();
const { body, query } = require("express-validator");
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
  body("dean_id").not().isEmpty().withMessage("ID декана не вказано"),
  require($ + "/controllers/faculties/edit")
);

r.patch(
  "/changeStatus",
  auth(["admin"]),
  body("id").not().isEmpty().withMessage("ID не вказано"),
  require($ + "/controllers/faculties/changeStatus")
);

r.delete(
  "/",
  auth(["admin"]),
  query("id").not().isEmpty().withMessage("ID не вказано"),
  require($ + "/controllers/faculties/delete")
);

module.exports = r;
