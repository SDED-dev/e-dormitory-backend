const db = require($ + "/db.js");

module.exports = async (req, res) => {
  try {
    const data = await db(
      "SELECT users.id, email, phone FROM users INNER JOIN user_roles ON users.id = user_roles.user_id WHERE role_id = 2"
    );
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(400).json({ errors: [{ msg: "Помилка даних" }] });
  }
};
