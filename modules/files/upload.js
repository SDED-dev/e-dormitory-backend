const multer = require("multer");
const path = require("path");
const randomstring = require("randomstring");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, process.env.STATIC_PATH + "/temp/");
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
  limits: { fileSize: 1024 * 1024 * 10 },
});

module.exports = upload;
