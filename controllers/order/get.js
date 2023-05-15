const db = require($ + "/db.js");
const filesList = require($ + "/modules/files/list.js");

module.exports = async (req, res) => {
  try {
    const { orderId } = req.params;

    const data = await db(
      `SELECT
    orders.id,
    first_name,
    last_name,
    sur_name,
    gender,
    faculties.name AS faculty,
    course.name AS course,
    dormitories.number AS dormitory,
    rooms.number AS room,
    "group",
    benefit_id,
    passport,
    "RNTRC",
    order_statuses.name AS status,
    created_at,
    check_in,
    check_out
FROM orders
    INNER JOIN rooms ON orders.room_id = rooms.id
    INNER JOIN course ON orders.course_id = course.id
    INNER JOIN faculties ON orders.faculty_id = faculties.id
    INNER JOIN dormitories ON orders.dormitory_id = dormitories.id
    INNER JOIN order_statuses ON orders.status = order_statuses.id
WHERE orders.id = ?`,
      [orderId]
    );

    if (data) {
      for (let i = 0; i < data.length; i++) {
        data[i].files = await filesList(data[i].id);
      }
    }

    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(400).json({ errors: [{ msg: "Помилка даних" }] });
  }
};
