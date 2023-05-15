const db = require($ + "/db.js");

module.exports = async (req, res) => {
  try {
    var data;
    if (req.user.roles.includes("commandant")) {
      const pass = await db(
        "SELECT id FROM dormitories WHERE commandant_id = ?",
        [req.user.id]
      );
      if (pass.length != 0) {
        data = await db(
          "SELECT rooms.id, name AS faculties_name, number, capacity FROM rooms INNER JOIN faculties ON rooms.faculties_id = faculties.id WHERE dormitory_id = ?",
          [pass[0].id]
        );
      }
    }
    if (req.user.roles.includes("user")) {
      const { dormitory_id, faculty_id } = req.query;
      data = await db(
        "SELECT id, number FROM rooms WHERE dormitory_id = ? AND faculties_id = ?",
        [dormitory_id, faculty_id]
      );
    }

    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(400).json({ errors: [{ msg: "Помилка даних" }] });
  }
};
