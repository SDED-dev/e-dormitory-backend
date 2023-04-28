const fs = require("fs");

module.exports = (order) => {
  try {
    return new Promise(async (resolve, reject) => {
      try {
        const files = await fs.promises.readdir(
          process.env.STATIC_PATH + `/orders/${order}`
        );
        resolve(files);
      } catch (error) {
        resolve([]);
      }
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ errors: [{ msg: "Помилка даних" }] });
  }
};
