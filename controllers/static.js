const { validationResult } = require("express-validator");
const db = require($ + "/db.js");
const jwt = require("jsonwebtoken");

module.exports = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(404).json({ errors: errors.array() });
  }

  try {
    const token = req.query.token;
    jwt.verify(token, process.env.JWT_SECRET);
    const { user } = jwt.decode(token, process.env.JWT_SECRET);
    const { order, file } = req.query;

    if (user.roles.includes("admin") || user.roles.includes("moderator"))
      return res.sendfile(process.env.STATIC_PATH + `/orders/${order}/${file}`);

    if (user.roles.includes("user")) {
      const check = await db(`SELECT user_id FROM orders WHERE id = ?`, [
        order,
      ]);
      if (check[0].user_id === user.id)
        return res.sendfile(
          process.env.STATIC_PATH + `/orders/${order}/${file}`
        );
    }
    res.status(401).json({ errors: [{ msg: "У доступі відмовлено" }] });
  } catch (err) {
    console.log(err);
    res.status(401).json({ errors: [{ msg: "У доступі відмовлено" }] });
  }
};
