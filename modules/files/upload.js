const multer = require("multer");
const path = require("path");
const randomstring = require("randomstring");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/temp/");
  },
  filename: (req, file, cb) => {
    const filename =
      randomstring.generate(16) + path.extname(file.originalname);
    file.newName = filename;
    cb(null, filename);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "application/pdf"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  fileFilter,
  storage,
  limits: { fileSize: 1048576 },
});

module.exports = upload;
