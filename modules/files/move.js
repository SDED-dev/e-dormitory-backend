const fs = require("fs");
const path = require("path");

module.exports = async (res, order, files) => {
  try {
    const keys = Object.keys(files);
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      for (let j = 0; j < files[key].length; j++) {
        const file = files[key][j];

        const source = file.path;
        const newPath = `${$}/uploads/orders/${order}`;
        const target = `${newPath}/${key}_${j}${path.extname(
          file.originalname
        )}`;
        await fs.promises.mkdir(newPath, { recursive: true });
        await fs.promises.rename(source, target);
      }
    }
    res.status(201).json({ msg: "Заявку створено" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ errors: [{ msg: "Помилка даних" }] });
  }
};
