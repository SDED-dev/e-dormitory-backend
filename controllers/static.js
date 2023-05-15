const { validationResult } = require("express-validator");
const db = require($ + "/db.js");
const jwt = require("jsonwebtoken");

module.exports = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(404).json({ errors: errors.array() });
  }

  try {
    const { token, order, file } = req.query;
    jwt.verify(token, process.env.JWT_SECRET);
    const { user } = jwt.decode(token, process.env.JWT_SECRET);

    const local_file = process.env.STATIC_PATH + `/orders/${order}/${file}`;

    if (user.roles.includes("admin")) return res.sendFile(local_file);

    if (user.roles.includes("dean")) {
      const check = await db(
        `SELECT dean_id FROM faculties WHERE id = (SELECT faculty_id FROM orders WHERE id = ?)`,
        [order]
      );
      if (check[0].dean_id === user.id) return res.sendFile(local_file);
    }

    if (user.roles.includes("commandant")) {
      const check = await db(
        `SELECT commandant_id FROM dormitories WHERE id = (SELECT dormitory_id FROM orders WHERE id = ?)`,
        [order]
      );
      if (check[0].commandant_id === user.id) return res.sendFile(local_file);
    }
    if (user.roles.includes("user")) {
      const check = await db(`SELECT user_id FROM orders WHERE id = ?`, [
        order,
      ]);
      if (check[0].user_id === user.id) return res.sendFile(local_file);
    }
    res.status(401).json({ errors: [{ msg: "У доступі відмовлено" }] });
  } catch (err) {
    console.log(err);
    res.status(401).json({ errors: [{ msg: "У доступі відмовлено" }] });
  }
};
