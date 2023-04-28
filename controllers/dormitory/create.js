const db = require($ + "/db.js");
const { validationResult } = require("express-validator");

module.exports = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(404).json({ errors: errors.array() });
  }
  try {
    const number = req.body.number;
    const moderator_id = req.body.moderator_id || null;

    await db(`INSERT INTO dormitory (number, moderator_id) VALUES (?, ?)`, [
      number,
      moderator_id,
    ]);

    res.status(200).json({ message: "Запис додано" });
  } catch (err) {
    console.log(err);
    res.status(400).json({ errors: [{ msg: "Помилка даних" }] });
  }
};
