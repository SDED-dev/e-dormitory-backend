const db = require($ + "/db.js");

module.exports = async (req, res) => {
  try {
    const data = await db(
      "SELECT dormitory.id, number, moderator_id, email  FROM dormitory INNER JOIN users ON dormitory.moderator_id = users.id"
    );
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(400).json({ errors: [{ msg: "Помилка даних" }] });
  }
};
