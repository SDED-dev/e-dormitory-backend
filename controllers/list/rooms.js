const db = require($ + "/db.js");

module.exports = async (req, res) => {
  try {
    const filter = req.body.filter;
    const value = req.body.value;

    var sql = `SELECT rooms.id, rooms.number, capacity, capacity_available, faculties.name AS faculties_name, dormitory.number AS dormitory_number FROM rooms INNER JOIN faculties ON faculties.id = faculties_id INNER JOIN dormitory ON dormitory.id = dormitory_id`;

    if (filter && value) sql += ` WHERE ${filter} = ${value}`;
    const data = await db(sql);
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(400).json({ errors: [{ msg: "Помилка даних" }] });
  }
};
