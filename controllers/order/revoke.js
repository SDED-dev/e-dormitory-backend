const db = require($ + "/db.js");
const jwt = require("jsonwebtoken");

module.exports = async (req, res) => {
  try {
    const token = req.headers.authorization;
    const { user } = jwt.decode(token, process.env.JWT_SECRET);

    await db("UPDATE orders SET status = 3 WHERE user_id = ?", [user.id]);

    res.status(200).json({ message: "Заяву відкликано" });
  } catch (err) {
    console.log(err);
    res.status(400).json({ errors: [{ msg: "Помилка даних" }] });
  }
};
