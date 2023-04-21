const db = require($ + "/db.js");

module.exports = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const order = await db(
        `SELECT id FROM orders WHERE user_id = ? AND status = 1`,
        [id]
      );
      if (order.length === 0) resolve(true);
      else resolve(false);
    } catch (error) {
      resolve(false);
    }
  });
};
