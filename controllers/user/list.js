const db = require($ + "/db.js");

module.exports = async (req, res) => {
  try {
    const { filter } = req.query;

    var query =
      "SELECT users.id, email, phone FROM users INNER JOIN user_roles ON users.id = user_roles.user_id";

    if (!filter) query += " WHERE role_id = 2 OR role_id = 3";
    if (filter == "faculty_admin") query += " WHERE role_id = 2";
    if (filter == "dormitory_admin") query += " WHERE role_id = 3";

    const data = await db(query);
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(400).json({ errors: [{ msg: "Помилка даних" }] });
  }
};
