const db = require($ + "/db.js");
const { validationResult } = require("express-validator");

module.exports = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(404).json({ errors: errors.array() });
  }
  try {
    const { id } = req.query;

    const { affectedRows } = await db(`DELETE FROM check_time  WHERE id = ?`, [
      id,
    ]);

    if (affectedRows == 0)
      return res.status(404).json({ errors: [{ msg: "Запис не знайдено" }] });
    return res.status(200).json({ message: "Запис видалено" });
  } catch (err) {
    console.log(err);
    res.status(400).json({ errors: [{ msg: "Помилка даних" }] });
  }
};
