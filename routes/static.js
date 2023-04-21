const r = require("express").Router();
const { query } = require("express-validator");
const auth = require($ + "/middleware/auth.js");

r.get(
  "/",
  query("token").not().isEmpty().withMessage("Доступ заборонено"),
  query("order").not().isEmpty().withMessage("Заяву не вказано"),
  query("file").not().isEmpty().withMessage("Файл не вказано"),
  require($ + "/controllers/static")
);

module.exports = r;
