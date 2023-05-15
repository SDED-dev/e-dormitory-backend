const db = require($ + "/db.js");

module.exports = async (req, res) => {
  try {
    var dormitory_id;
    var query =
      "SELECT faculties.id, name, dean_id, email, available FROM faculties LEFT JOIN users ON faculties.dean_id = users.id";
    if (req.user.roles.includes("user"))
      query = "SELECT id, name FROM faculties WHERE available = 1";
    if (req.user.roles.includes("commandant")) {
      const dormitory = await db(
        "SELECT id FROM dormitories WHERE commandant_id = ?",
        [req.user.id]
      );
      dormitory_id = dormitory[0]?.id;
      query =
        "SELECT faculties.id, name FROM faculties INNER JOIN faculties_dormitory ON faculties.id = faculties_dormitory.faculties_id WHERE faculties_dormitory.dormitory_id = ?";
    }

    const data = await db(query, [dormitory_id]);
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(400).json({ errors: [{ msg: "Помилка даних" }] });
  }
};
