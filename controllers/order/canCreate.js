const jwt = require("jsonwebtoken");

const canCreate = require($ + "/modules/order/canCreate.js");

module.exports = async (req, res) => {
  try {
    const token = req.headers.authorization;
    const { user } = jwt.decode(token, process.env.JWT_SECRET);

    res.status(200).json(await canCreate(user.id));
  } catch (err) {
    console.log(err);
    res.status(400).json({ errors: [{ msg: "Помилка даних" }] });
  }
};
