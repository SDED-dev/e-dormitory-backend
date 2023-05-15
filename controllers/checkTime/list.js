const db = require($ + "/db.js");
const moment = require("moment-timezone");

module.exports = async (req, res) => {
  try {
    var data;
    if (req.user.roles.includes("user")) {
      data = await db(
        "SELECT `in`, `out` FROM	check_time WHERE faculty_id = ? AND course_id = ?",
        [req.query.faculty_id, req.query.course_id]
      );
      data = format(data);
      //data = filter(data);
    }
    if (req.user.roles.includes("dean")) {
      const faculties = await db("SELECT id FROM faculties WHERE dean_id = ?", [
        req.user.id,
      ]);

      if (faculties.length == 0)
        return res
          .status(404)
          .json({ errors: [{ msg: "Ви не є працівником деканату" }] });

      data = await db(
        "SELECT id, course_id, `in`, `out` FROM check_time WHERE faculty_id = ?",
        [[faculties[0].id]]
      );
      data = format(data);
    }
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(400).json({ errors: [{ msg: "Помилка даних" }] });
  }
};

function format(data) {
  for (let i = 0; i < data.length; i++) {
    data[i].in = moment(data[i].in).format("YYYY-MM-DD");
    data[i].out = moment(data[i].out).format("YYYY-MM-DD");
  }
  return data;
}

function filter(obj) {
  var result = {
    in: [],
    out: [],
  };
  for (var i = 0; i < obj.length; i++) {
    result.in.push(obj[i].in);
    result.out.push(obj[i].out);
  }

  result.in = [...new Set(result.in)];
  result.out = [...new Set(result.out)];

  return result;
}
