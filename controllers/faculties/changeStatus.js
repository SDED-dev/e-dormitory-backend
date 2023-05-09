const db = require($ + "/db.js");
const { validationResult } = require("express-validator");

module.exports = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(404).json({ errors: errors.array() });
  }
  try {
    const { id } = req.body;

    await db(`UPDATE faculties SET available = NOT available WHERE id = ?`, [
      id,
    ]);

    return res.status(200).json({ message: "Статус змінено" });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ errors: [{ msg: "Помилка даних" }] });
  }
};
