const { validationResult } = require("express-validator");
const db = require($ + "/db.js");
const jwt = require("jsonwebtoken");
const moment = require("moment-timezone");
const move = require($ + "/modules/files/move");
const canCreate = require($ + "/modules/order/canCreate");

module.exports = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(404).json({ errors: errors.array() });
  }

  try {
    const b = req.body;
    const user = req.user;

    if (!(await canCreate(user.id)))
      return res.status(401).json({
        errors: [{ msg: "Дозволено мати лише одну активну заявку!" }],
      });

    const date = moment().tz("Europe/Kiev").format("YYYY-MM-DD HH:mm:ss");

    const orders_id = await db(
      "INSERT INTO orders (user_id, first_name, last_name, sur_name, gender, faculty_id, course_id, `group`, dormitory_id, room_id, passport, RNTRC, status, created_at, check_in, check_out) " +
        "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1, ?, ?, ?); SELECT id FROM orders WHERE user_id = ?;",
      [
        user.id,
        b.first_name,
        b.last_name,
        b.sur_name,
        b.gender,
        b.faculty_id,
        b.course_id,
        b.group,
        b.dormitory_id,
        b.room_id,
        b.passport,
        b.rntrc,
        date,
        b.check_in,
        b.check_out,
        user.id,
      ]
    );

    move(res, orders_id[1][0].id, req.files);
  } catch (err) {
    console.log(err);
    res.status(400).json({ errors: [{ msg: "Помилка даних" }] });
  }
};
