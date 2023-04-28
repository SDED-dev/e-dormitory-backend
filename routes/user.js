const r = require("express").Router();
const { body } = require("express-validator");
const auth = require($ + "/middleware/auth.js");

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

r.post(
  "/edit",
  auth(["admin", "user"]),
  body("id").isInt().withMessage("ID не є коректним"),
  body("email").isEmail().withMessage("Пошта не є коректною"),
  body("phone").isInt().withMessage("Телефон не є корректним"),
  require($ + "/controllers/user/edit")
);

module.exports = r;
