const r = require("express").Router();
const { body } = require("express-validator");
const auth = require($ + "/middleware/auth.js");

r.get(
  "/",
  auth(["admin", "dean", "commandant", "user"]),
  require($ + "/controllers/rooms/list")
);

r.post(
  "/create",
  auth(["moderator"]),
  body("faculties_id").isInt().withMessage("Факультет ID не вказано"),
  body("dormitory_id").isInt().withMessage("Гуртожиток ID не вказано"),
  body("number").not().isEmpty().withMessage("Новер кімнати не вказано"),
  body("capacity").not().isEmpty().withMessage("Місткість кімнати не вказано"),
  body("capacity_available")
    .not()
    .isEmpty()
    .withMessage("Доступна місткість кімнати не вказано"),
  require($ + "/controllers/rooms/create")
);

r.patch(
  "/edit",
  auth(["moderator"]),
  body("id").isInt().withMessage("ID не вказано"),
  body("faculties_id").isInt().withMessage("Факультет ID не вказано"),
  body("dormitory_id").isInt().withMessage("Гуртожиток ID не вказано"),
  body("number").not().isEmpty().withMessage("Новер кімнати не вказано"),
  body("capacity").not().isEmpty().withMessage("Місткість кімнати не вказано"),
  body("capacity_available")
    .not()
    .isEmpty()
    .withMessage("Доступна місткість кімнати не вказано"),
  require($ + "/controllers/rooms/edit")
);

module.exports = r;
