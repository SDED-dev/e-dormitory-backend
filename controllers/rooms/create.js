const db = require($ + "/db.js");
const { validationResult } = require("express-validator");

module.exports = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(404).json({ errors: errors.array() });
  }
  try {
    const { faculties_id, number, capacity } = req.body;

    const dormitory = await db(
      "SELECT id FROM dormitories WHERE commandant_id = ?",
      [req.user.id]
    );

    if (dormitory.length == 0)
      return res
        .status(404)
        .json({ errors: [{ msg: "Ви не є комендантом гуртожитку" }] });

    await db(
      `INSERT INTO rooms (faculties_id, dormitory_id, number, capacity) VALUES (?, ?, ?, ?)`,
      [faculties_id, dormitory[0].id, number, capacity]
    );

    res.status(200).json({ message: "Запис додано" });
  } catch (err) {
    console.log(err);
    res.status(400).json({ errors: [{ msg: "Помилка даних" }] });
  }
};
