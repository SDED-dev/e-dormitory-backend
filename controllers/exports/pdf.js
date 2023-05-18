const puppeteer = require("puppeteer");
var html = require("./html");
const db = require($ + "/db.js");

module.exports = async (req, res) => {
  try {
    const orders = req.query.orders;

    const orderId = JSON.parse(orders);

    var data = [];
    for (let i = 0; i < orderId.length; i++) {
      const temp = await db(
        "SELECT first_name, last_name, sur_name, gender, faculties.name AS faculty, course.name AS course, dormitories.number AS dormitory, rooms.number AS room, `group`, benefit.name AS benefit_name, passport, `RNTRC`, order_statuses.name AS status, created_at, check_in, check_out FROM orders INNER JOIN rooms ON orders.room_id = rooms.id INNER JOIN course ON orders.course_id = course.id INNER JOIN faculties ON orders.faculty_id = faculties.id INNER JOIN dormitories ON orders.dormitory_id = dormitories.id INNER JOIN order_statuses ON orders.status = order_statuses.id LEFT JOIN benefit ON orders.benefit_id = benefit.id WHERE orders.id = ?",
        [orderId[i]]
      );
      data.push(temp[0]);
    }

    var sn = "";
    for (let i = 0; i < data.length; i++) {
      sn += `
 <tr>
                    <td>${i + 1}.</td>
                    <td>${data[i].last_name}</td>
                    <td>${data[i].first_name}</td>
                    <td>${data[i].sur_name}</td>
                    <td>${data[i].course}</td>
                    <td>${data[i].group}</td>
                    <td>${data[i].dormitory}</td>
                    <td>${data[i].room}</td>
                    <td>${data[i].check_in.toISOString().slice(0, 10)}</td>
                    <td>${data[i].check_out.toISOString().slice(0, 10)}</td>
                </tr>
 `;
    }

    html = html.replace("key-table_edit", sn);

    var arg = {};

    if (process.platform == "linux")
      arg = { executablePath: "/usr/bin/chromium-browser" };

    const browser = await puppeteer.launch(arg);

    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: "domcontentloaded" });

    await page.emulateMediaType("screen");

    const pdf = await page.pdf({
      margin: { top: "100px", right: "50px", bottom: "100px", left: "50px" },
      printBackground: true,
      format: "A4",
    });

    await browser.close();
    res.contentType("application/pdf");
    res.end(pdf);
  } catch (err) {
    console.log(err);
    res.status(400).json({ errors: [{ msg: "Помилка даних" }] });
  }
};
