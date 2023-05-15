const db = require($ + "/db.js");
const filesList = require($ + "/modules/files/list.js");

module.exports = async (req, res) => {
  try {
    const { orderId } = req.params;
    var access = false;

    if (req.user.roles.includes("admin")) access = true;

    if (req.user.roles.includes("dean")) {
      const check = await db(
        `SELECT dean_id FROM faculties WHERE id = (SELECT faculty_id FROM orders WHERE id = ?)`,
        [orderId]
      );
      if (check[0].dean_id === req.user.id) access = true;
    }

    if (req.user.roles.includes("commandant")) {
      const check = await db(
        `SELECT commandant_id FROM dormitories WHERE id = (SELECT dormitory_id FROM orders WHERE id = ?)`,
        [orderId]
      );
      if (check[0].commandant_id === req.user.id) access = true;
    }
    if (req.user.roles.includes("user")) {
      const check = await db(`SELECT user_id FROM orders WHERE id = ?`, [
        orderId,
      ]);
      if (check[0].user_id === req.user.id) access = true;
    }

    if (!access)
      return res
        .status(401)
        .json({ errors: [{ msg: "У доступі відмовлено" }] });

    const data = await db(
      "SELECT orders.id, first_name, last_name, sur_name, gender, faculties.name AS faculty, faculty_id, course.name AS course, dormitories.number AS dormitory, dormitories.id AS dormitory_id, rooms.number AS room, `group`, benefit.name AS benefit_name, benefit.discount AS benefit_discount, passport, `RNTRC`, order_statuses.name AS status, created_at, check_in, check_out FROM orders INNER JOIN rooms ON orders.room_id = rooms.id INNER JOIN course ON orders.course_id = course.id INNER JOIN faculties ON orders.faculty_id = faculties.id INNER JOIN dormitories ON orders.dormitory_id = dormitories.id INNER JOIN order_statuses ON orders.status = order_statuses.id LEFT JOIN benefit ON orders.benefit_id = benefit.id WHERE orders.id = ?",
      [orderId]
    );

    if (data) {
      for (let i = 0; i < data.length; i++) {
        data[i].files = await filesList(data[i].id);
      }
    }

    return res.status(200).json(data);
  } catch (err) {
    console.log(err);
    return res.status(400).json({ errors: [{ msg: "Помилка даних" }] });
  }
};
