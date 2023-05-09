const r = require("express").Router();
const { body } = require("express-validator");
const auth = require($ + "/middleware/auth.js");

r.get(
  "/",
  auth(["admin", "dean", "commandant", "user"]),
  require($ + "/controllers/checkTime/list")
);

r.post(
  "/create",
  auth(["admin", "dean"]),
  body("course_id").not().isEmpty().withMessage("Курс не вказано"),
  body("in_time").not().isEmpty().withMessage("Дату заселення не вказано"),
  body("out_time").not().isEmpty().withMessage("Дату виселення не вказано"),
  require($ + "/controllers/checkTime/create")
);

r.patch(
  "/edit",
  auth(["admin", "dean"]),
  body("id").not().isEmpty().withMessage("ID не вказано"),
  body("course_id").not().isEmpty().withMessage("Курс не вказано"),
  body("in_time").not().isEmpty().withMessage("Дату заселення не вказано"),
  body("out_time").not().isEmpty().withMessage("Дату виселення не вказано"),
  require($ + "/controllers/checkTime/edit")
);

module.exports = r;
