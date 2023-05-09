const db = require($ + "/db.js");

module.exports = async (req, res) => {
  try {
    const data = await db("SELECT * FROM check_time");
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(400).json({ errors: [{ msg: "Помилка даних" }] });
  }
};
