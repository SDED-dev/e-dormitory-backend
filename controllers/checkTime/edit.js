const db = require($ + "/db.js");
const { validationResult } = require("express-validator");

module.exports = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(404).json({ errors: errors.array() });
  }
  try {
    const { id, course_id, faculty_id, in_time, out_time } = req.body;

    await db(
      "UPDATE `check_time` SET `course_id` = ?, `faculty_id` = ?, `in` = ?, `out` = ? WHERE id = ?",
      [course_id, faculty_id, in_time, out_time, id]
    );

    res.status(200).json({ message: "Запис змінено" });
  } catch (err) {
    console.log(err);
    res.status(400).json({ errors: [{ msg: "Помилка даних" }] });
  }
};
