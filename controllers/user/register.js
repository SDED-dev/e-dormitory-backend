const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const db = require($ + "/db.js");
const auth = require($ + "/modules/auth.js");

module.exports = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(404).json({ errors: errors.array() });
  }

  try {
    const body = req.body;
    const hashPassw = await bcrypt.hashSync(body.password, 15);
    var role = "user";

    if (body.role && auth(req, ["moderator", "admin"])) {
      role = body.role;
    }

    await db(
      `INSERT INTO users(email, phone, password) VALUES (?,?,?);
            INSERT INTO user_roles (user_id, role_id) VALUES ((SELECT id FROM users WHERE email = ?), (SELECT id FROM roles WHERE name = ?))
      `,
      [body.email, body.phone, hashPassw, body.email, role]
    );
    res.status(201).json({ message: "Користувача створено" });
  } catch (err) {
    console.log(err);
    if (err.message.includes("Duplicate entry"))
      res
        .status(409)
        .json({ errors: [{ msg: "Дані для реєстрації зайняті" }] });
    res.status(400);
  }
};
