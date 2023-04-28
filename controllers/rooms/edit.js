const db = require($ + "/db.js");
const { validationResult } = require("express-validator");

module.exports = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(404).json({ errors: errors.array() });
  }
  try {
    const {
      id,
      faculties_id,
      dormitory_id,
      number,
      capacity,
      capacity_available,
    } = req.body;
    await db(
      `UPDATE rooms SET faculties_id = ?, dormitory_id = ?, number = ?, capacity = ?, capacity_available = ? WHERE id = ?`,
      [faculties_id, dormitory_id, number, capacity, capacity_available, id]
    );

    res.status(200).json({ message: "Запис змінено" });
  } catch (err) {
    console.log(err);
    res.status(400).json({ errors: [{ msg: "Помилка даних" }] });
  }
};
