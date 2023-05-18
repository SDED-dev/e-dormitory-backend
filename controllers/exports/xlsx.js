const db = require($ + "/db.js");

module.exports = async (req, res) => {
  try {
    const nodeExcel = require("excel-export");

    const orders = req.query.orders;

    const orderId = JSON.parse(orders);

    var conf = {};
    conf.cols = [
      {
        caption: "ID",
        type: "String",
        width: 64,
      },
      {
        caption: "Ім'я",
        type: "String",
        width: 64,
      },
      {
        caption: "Прізвище",
        type: "String",
        width: 64,
      },
      {
        caption: "По-батькові",
        type: "String",
        width: 64,
      },
      {
        caption: "Стать",
        type: "String",
        width: 64,
      },
      {
        caption: "Факультет",
        type: "String",
        width: 64,
      },
      {
        caption: "Курс",
        type: "String",
        width: 64,
      },
      {
        caption: "Гуртожиток",
        type: "String",
        width: 64,
      },
      {
        caption: "Кімната",
        type: "String",
        width: 64,
      },
      {
        caption: "Група",
        type: "String",
        width: 64,
      },
      {
        caption: "Пільга",
        type: "String",
        width: 64,
      },
      {
        caption: "Паспорт",
        type: "String",
        width: 64,
      },
      {
        caption: "РНОКПП",
        type: "String",
        width: 64,
      },
      {
        caption: "Статус",
        type: "String",
        width: 64,
      },
      {
        caption: "Дата створення",
        type: "String",
        width: 64,
      },
      {
        caption: "Дата заселення",
        type: "String",
        width: 64,
      },
      {
        caption: "Дата виселення",
        type: "String",
        width: 64,
      },
    ];

    conf.rows = [];

    var data = [];
    for (let i = 0; i < orderId.length; i++) {
      const temp = await db(
        "SELECT orders.id, first_name, last_name, sur_name, gender, faculties.name AS faculty, course.name AS course, dormitories.number AS dormitory, rooms.number AS room, `group`, benefit.name AS benefit_name, passport, `RNTRC`, order_statuses.name AS status, created_at, check_in, check_out FROM orders INNER JOIN rooms ON orders.room_id = rooms.id INNER JOIN course ON orders.course_id = course.id INNER JOIN faculties ON orders.faculty_id = faculties.id INNER JOIN dormitories ON orders.dormitory_id = dormitories.id INNER JOIN order_statuses ON orders.status = order_statuses.id LEFT JOIN benefit ON orders.benefit_id = benefit.id WHERE orders.id = ?",
        [orderId[i]]
      );
      data.push(temp[0]);
    }

    for (let i = 0; i < data.length; i++) {
      var dd = Object.values(data[i]);
      for (let i = 0; i < dd.length; i++) {
        if (typeof dd[i] == "number") dd[i] = dd[i].toString();
        if (dd[i] == null) dd[i] = "dd";
        if (dd[i] instanceof Date) dd[i] = dd[i].toISOString().slice(0, 10);
      }
      conf.rows.push(dd);
    }
    var result = nodeExcel.execute(conf);
    res.setHeader("Content-Type", "application/vnd.openxmlformates");
    res.setHeader(
      "Content-Disposition",
      "attachment;filename=" + "data_export.xlsx"
    );
    res.end(result, "binary");
  } catch (err) {
    console.log(err);
    res.status(400).json({ errors: [{ msg: "Помилка даних" }] });
  }
};
