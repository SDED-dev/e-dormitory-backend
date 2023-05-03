const db = require($ + "/db.js");
const { validationResult } = require("express-validator");

module.exports = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(404).json({ errors: errors.array() });
  }
  try {
    const { name, discount } = req.body;

    await db(`INSERT INTO benefit (name, discount) VALUES (?, ?)`, [
      name,
      discount,
    ]);

    return res.status(200).json({ message: "Запис додано" });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ errors: [{ msg: "Помилка даних" }] });
  }
};
