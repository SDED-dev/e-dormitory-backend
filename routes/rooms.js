const r = require("express").Router();
const { body, query } = require("express-validator");
const auth = require($ + "/middleware/auth.js");

r.get(
  "/",
  auth(["admin", "dean", "commandant", "user"]),
  require($ + "/controllers/rooms/list")
);

r.post(
  "/create",
  auth(["commandant"]),
  body("faculties_id").isInt().withMessage("Факультет ID не вказано"),
  body("number").not().isEmpty().withMessage("Новер кімнати не вказано"),
  body("capacity").not().isEmpty().withMessage("Місткість кімнати не вказано"),
  require($ + "/controllers/rooms/create")
);

r.patch(
  "/edit",
  auth(["commandant"]),
  body("id").isInt().withMessage("ID не вказано"),
  body("faculties_id").isInt().withMessage("Назва факультету не вказано"),
  body("number").not().isEmpty().withMessage("Номер кімнати не вказано"),
  body("capacity").not().isEmpty().withMessage("Місткість кімнати не вказано"),
  require($ + "/controllers/rooms/edit")
);

r.delete(
  "/",
  auth(["commandant"]),
  query("id").isInt().withMessage("ID не вказано"),
  require($ + "/controllers/rooms/delete")
);

module.exports = r;
