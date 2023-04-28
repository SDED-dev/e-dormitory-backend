const db = require($ + "/db.js");
const { validationResult } = require("express-validator");

module.exports = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(404).json({ errors: errors.array() });
  }
  try {
    const { faculties_id, dormitory_id, number, capacity, capacity_available } =
      req.body;
    await db(
      `INSERT INTO rooms (faculties_id, dormitory_id, number, capacity, capacity_available) VALUES (?, ?, ?, ?, ?)`,
      [faculties_id, dormitory_id, number, capacity, capacity_available]
    );

    res.status(200).json({ message: "Запис додано" });
  } catch (err) {
    console.log(err);
    res.status(400).json({ errors: [{ msg: "Помилка даних" }] });
  }
};
