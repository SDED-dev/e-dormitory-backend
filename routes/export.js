const r = require("express").Router();
const { body } = require("express-validator");
const auth = require($ + "/middleware/auth.js");

r.get(
  "/xlsx",
  // auth(["admin", "dean", "commandant"]),
  require($ + "/controllers/exports/xlsx")
);

r.get("/pdf", require($ + "/controllers/exports/pdf"));

r.post("/test", (req, res) => {
  var nodeExcel = require("excel-export");

  var configuration = {};
  configuration.cols = [
    {
      caption: "ID",
      type: "String",
      width: 20,
    },
    {
      caption: "Make",
      type: "String",
      width: 20,
    },
    {
      caption: "Year",
      type: "String",
      width: 20,
    },
    {
      caption: "Model",
      type: "String",
      width: 20,
    },
    {
      caption: "Type",
      type: "String",
      width: 20,
    },
  ];

  configuration.rows = [
    ["01", "toyota", "2005-2010", "a", "xxxx"],
    ["02", "nissan", "2005-2010", "b", "xxxx"],
  ];
  var result = nodeExcel.execute(configuration);
  res.setHeader("Content-Type", "application/vnd.openxmlformates");
  res.setHeader(
    "Content-Disposition",
    "attachment;filename=" + "file_name.xlsx"
  );
  res.end(result, "binary");
});

module.exports = r;
