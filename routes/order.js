const r = require("express").Router();
const { body } = require("express-validator");
const auth = require($ + "/middleware/auth.js");
const upload = require($ + "/modules/files/upload.js");

r.post(
  "/create",
  auth(["user"]),
  upload.fields([
    {
      name: "passport",
      maxCount: 4,
    },
    {
      name: "identification_code",
      maxCount: 1,
    },
    {
      name: "medical_reference",
      maxCount: 4,
    },
    {
      name: "receipt",
      maxCount: 1,
    },
  ]),
  body("first_name").not().isEmpty().withMessage("Імя не вказано"),
  body("last_name").not().isEmpty().withMessage("Прізвище не вказано"),
  body("sur_name").not().isEmpty().withMessage("По-батькові не вказано"),
  body("faculty_id").isInt().withMessage("Факультет не вказано"),
  body("course").not().isEmpty().withMessage("Курс не вказано"),
  body("group").not().isEmpty().withMessage("Група не вказано"),
  body("dormitory_id").isInt().withMessage("dormitory_id не вказано"),
  body("room_id").isInt().withMessage("room_id не вказано"),
  body("passport").not().isEmpty().withMessage("Паспорт не вказано"),
  body("rnocpp").not().isEmpty().withMessage("РНОКПП не вказано"),
  require($ + "/controllers/order/create")
);

r.patch("/revoke", auth(["user"]), require($ + "/controllers/order/revoke"));

r.patch(
  "/editStatus",
  auth(["admin", "moderator"]),
  body("order").isInt().withMessage("Заяву не вказано"),
  body("status").isInt().withMessage("Статус не вказано"),
  require($ + "/controllers/order/editStatus")
);

r.get(
  "/list",
  auth(["admin", "moderator", "user"]),
  body("page").isInt().withMessage("Сторінку не вказано"),
  body("limit").isInt().withMessage("Ліміт не вказано"),
  require($ + "/controllers/order/list")
);

r.get(
  "/canCreate",
  auth(["user"]),
  require($ + "/controllers/order/canCreate.js")
);

r.use("/comment", require("./comment.js"));

module.exports = r;
