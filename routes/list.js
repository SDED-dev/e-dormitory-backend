const r = require("express").Router();
const { body } = require("express-validator");
const auth = require($ + "/middleware/auth.js");

r.post(
  "/faculties",
  auth(["admin", "moderator", "user"]),
  require($ + "/controllers/list/faculties")
);

r.post(
  "/dormitory",
  auth(["admin", "moderator", "user"]),
  require($ + "/controllers/list/dormitory")
);

r.post(
  "/rooms",
  auth(["admin", "moderator", "user"]),
  body("filter").not().isEmpty().withMessage("Фільтр не вказано"),
  body("value").not().isEmpty().withMessage("Значення не вказано"),
  require($ + "/controllers/list/rooms")
);

r.post(
  "/benefit",
  auth(["admin", "moderator", "user"]),
  require($ + "/controllers/list/benefit")
);

module.exports = r;
