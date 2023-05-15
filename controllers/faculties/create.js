const db = require($ + "/db.js");
const { validationResult } = require("express-validator");

module.exports = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(404).json({ errors: errors.array() });
  }
  try {
    const { name } = req.body;
    const dean_id = req.body.dean_id || null;

    await db(`INSERT INTO faculties (name, dean_id) VALUES (?)`, [
      name,
      dean_id,
    ]);

    res.status(200).json({ message: "Запис додано" });
  } catch (err) {
    console.log(err);
    res.status(400).json({ errors: [{ msg: "Помилка даних" }] });
  }
};
