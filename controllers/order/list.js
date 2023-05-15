const db = require($ + "/db.js");
const jwt = require("jsonwebtoken");
const filesList = require($ + "/modules/files/list.js");

module.exports = async (req, res) => {
  try {
    var data;
    var query =
      "SELECT orders.id, first_name, last_name, sur_name, gender, faculties.name AS faculty, course.name AS course, `group` FROM orders INNER JOIN rooms ON orders.room_id = rooms.id INNER JOIN course ON orders.course_id = course.id INNER JOIN faculties ON orders.faculty_id = faculties.id";

    if (req.user.roles.includes("dean")) {
      const faculties = await db("SELECT id FROM faculties WHERE dean_id = ?", [
        req.user.id,
      ]);
      data = await db(query + " WHERE faculty_id = ?", [faculties[0].id]);
    }

    if (req.user.roles.includes("commandant")) {
      const dormitory = await db(
        "SELECT id FROM dormitories WHERE commandant_id = ?",
        [req.user.id]
      );
      data = await db("SELECT * FROM orders WHERE dormitory_id = ?", [
        dormitory[0].id,
      ]);
    }

    if (data) {
      for (let i = 0; i < data.length; i++) {
        data[i].files = await filesList(data[i].id);
      }
    }

    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(400).json({ errors: [{ msg: "Помилка даних" }] });
  }
};
