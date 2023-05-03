const db = require($ + "/db.js");
const { validationResult } = require("express-validator");

module.exports = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(404).json({ errors: errors.array() });
  }
  try {
    const { id, number, moderator_id } = req.body;

    await db(
      `UPDATE dormitories SET number = ?, moderator_id = ? WHERE id = ?`,
      [number, moderator_id, id]
    );

    res.status(200).json({ message: "Запис змінено" });
  } catch (err) {
    console.log(err);
    res.status(400).json({ errors: [{ msg: "Помилка даних" }] });
  }
};
