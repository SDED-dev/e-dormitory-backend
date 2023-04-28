const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const db = require($ + "/db.js");
const jwt = require("jsonwebtoken");

module.exports = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(404).json({ errors: errors.array() });
  }
  try {
    const body = req.body;
    const { user } = jwt.decode(
      req.headers.authorization,
      process.env.JWT_SECRET
    );

    if (user.roles.includes("user")) {
      const check = await db(`SELECT id FROM users WHERE id = ?`, [user.id]);

      if (check.length == 0 || user.id != body.id)
        return res
          .status(401)
          .json({ errors: [{ msg: "У доступі відмовлено" }] });
    }

    await db(`UPDATE users SET  email = ? , phone = ? WHERE id = ?`, [
      body.email,
      body.phone,
      body.id,
    ]);

    if (body.password) {
      const hashPassw = await bcrypt.hash(body.password, 15);
      db(`UPDATE users SET password = ? WHERE id = ?`, [hashPassw, body.id]);
    }

    res.status(200).json({ message: "User updated" });
  } catch (err) {
    if (err.message.includes("Duplicate entry"))
      res.status(409).json({ errors: [{ msg: "Duplicate entry" }] });
    else {
      res.status(400);
      console.log(err);
    }
  }
};
