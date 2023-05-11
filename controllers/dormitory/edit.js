const db = require($ + "/db.js");
const { validationResult } = require("express-validator");

module.exports = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(404).json({ errors: errors.array() });
  }
  try {
    const { id, number, commandant_id, faculties } = req.body;

    await db(
      `UPDATE dormitories SET number = ?, commandant_id = ? WHERE id = ?`,
      [number, commandant_id, id]
    );

    if (faculties) {
      await db(`DELETE FROM faculties_dormitory WHERE dormitory_id = ?`, [id]);
      for (let i = 0; i < faculties.length; i++) {
        await db(
          `INSERT INTO faculties_dormitory( dormitory_id, faculties_id) VALUES (?, (SELECT id FROM faculties WHERE name = ? LIMIT 1))`,
          [id, faculties[i]]
        );
      }
    }
    res.status(200).json({ message: "Запис змінено" });
  } catch (err) {
    console.log(err);
    res.status(400).json({ errors: [{ msg: "Помилка даних" }] });
  }
};
