const db = require($ + "/db.js");
const { validationResult } = require("express-validator");

module.exports = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(404).json({ errors: errors.array() });
  }
  try {
    const { course_id, in_time, out_time } = req.body;

    const faculties = await db("SELECT id FROM faculties WHERE dean_id = ?", [
      req.user.id,
    ]);

    if (faculties.length == 0)
      return res
        .status(404)
        .json({ errors: [{ msg: "Ви не є працівником деканату" }] });

    await db(
      "INSERT INTO `check_time` (`course_id`, `faculty_id`, `in`, `out`) VALUES (?, ?, ?, ?)",
      [course_id, faculties[0].id, in_time, out_time]
    );

    res.status(200).json({ message: "Запис додано" });
  } catch (err) {
    console.log(err);
    res.status(400).json({ errors: [{ msg: "Помилка даних" }] });
  }
};
