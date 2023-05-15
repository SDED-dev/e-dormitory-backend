const db = require($ + "/db.js");
const { validationResult } = require("express-validator");

module.exports = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(404).json({ errors: errors.array() });
  }
  try {
    const { id, faculties_id, number, capacity } = req.body;

    const dormitory = await db(
      "SELECT id FROM dormitories WHERE commandant_id = ?",
      [req.user.id]
    );

    if (dormitory.length == 0)
      return res
        .status(404)
        .json({ errors: [{ msg: "Ви не є комендантом гуртожитку" }] });

    await db(
      `UPDATE rooms SET faculties_id = ?, dormitory_id = ?, number = ?, capacity = ? WHERE id = ?`,
      [faculties_id, dormitory[0].id, number, capacity, id]
    );

    res.status(200).json({ message: "Запис змінено" });
  } catch (err) {
    console.log(err);
    res.status(400).json({ errors: [{ msg: "Помилка даних" }] });
  }
};
