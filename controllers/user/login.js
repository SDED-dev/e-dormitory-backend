require("dotenv").config();
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const db = require($ + "/db.js");
const role = require($ + "/modules/user/getRoles.js");

module.exports = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(404).json({ errors: errors.array() });

  const body = req.body;

  try {
    const [candidate] = await db(
      `SELECT * FROM users WHERE email = ? OR phone = ?`,
      [body.login, body.login]
    );
    if (!candidate)
      return res
        .status(404)
        .json({ errors: [{ msg: "Користувача не знайдено" }] });

    const validePassw = bcrypt.compareSync(body.password, candidate.password);
    if (!validePassw)
      return res.status(400).json({ errors: [{ msg: "Невірний пароль" }] });

    const roles = await role(candidate.id);

    const user = {
      id: candidate.id,
      email: candidate.email,
      phone: candidate.phone,
      roles: roles,
    };

    const jwt = generateJWT({
      user,
    });
    res.status(200).json({
      user,
      token: jwt,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ errors: [{ msg: "Internal error" }] });
  }
};

function generateJWT(arg) {
  return jwt.sign(arg, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });
}
