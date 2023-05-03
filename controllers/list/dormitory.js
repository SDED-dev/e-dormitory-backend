const db = require($ + "/db.js");

module.exports = async (req, res) => {
  try {
    const data = await db(
      "SELECT dormitories.id, number, moderator_id, email  FROM dormitories INNER JOIN users ON dormitories.moderator_id = users.id"
    );
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(400).json({ errors: [{ msg: "Помилка даних" }] });
  }
};
