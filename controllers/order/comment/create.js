const db = require($ + "/db.js");
const jwt = require("jsonwebtoken");

module.exports = async (req, res) => {
  try {
    const { order, content } = req.body;

    await db("UPDATE orders SET comment = ? WHERE id = ?", [content, order]);

    res.status(200).json({ message: "Коментар додано" });
  } catch (err) {
    console.log(err);
    res.status(400).json({ errors: [{ msg: "Помилка даних" }] });
  }
};
