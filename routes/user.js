const r = require("express").Router();
const { body } = require("express-validator");

r.post(
  "/register",
  body("email").isEmail().withMessage("Пошта не є коректною"),
  body("phone").isInt().withMessage("Телефон не є корректним"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Пароль має мати не менше 6 символів"),
  require($ + "/controllers/user/register")
);

r.post(
  "/login",
  body("login")
    .isLength({ min: 2 })
    .withMessage("Логіном може слугувати email або телефон"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Пароль має мати не менше 6 символів"),
  require("../controllers/user/login")
);

module.exports = r;
