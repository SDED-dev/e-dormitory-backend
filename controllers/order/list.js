const db = require($ + "/db.js");
const jwt = require("jsonwebtoken");
const filesList = require($ + "/modules/files/list.js");

module.exports = async (req, res) => {
  try {
    const token = req.headers.authorization;
    const { user } = jwt.decode(token, process.env.JWT_SECRET);

    const { page, limit } = req.body;

    var data;

    if (user.roles.includes("user"))
      data = await db(
        `SELECT * FROM orders WHERE user_id = ? LIMIT ? OFFSET ?`,
        [user.id, limit, page * limit]
      );
    else
      data = await db(`SELECT * FROM orders LIMIT ? OFFSET ?`, [
        limit,
        page * limit,
      ]);

    for (let i = 0; i < data.length; i++) {
      data[i].files = await filesList(data[i].id);
    }

    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(400).json({ errors: [{ msg: "Помилка даних" }] });
  }
};
