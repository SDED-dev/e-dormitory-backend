const db = require($ + "/db.js");

module.exports = async (req, res) => {
  try {
    var query = "SELECT * FROM benefit";
    if (req.user.roles.includes("user"))
      query = "SELECT id, name, discount FROM benefit";
    const data = await db(query);
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(400).json({ errors: [{ msg: "Помилка даних" }] });
  }
};
