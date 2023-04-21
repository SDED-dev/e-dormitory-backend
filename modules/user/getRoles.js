const db = require($ + "/db.js");

module.exports = (id) => {
  return new Promise(async (resolve, reject) => {
    const roles = await db(
      `SELECT roles.name FROM user_roles INNER JOIN roles ON user_roles.role_id = roles.id WHERE user_id = ?`,
      id
    );

    var rolesList = [];
    roles.forEach((role) => {
      rolesList.push(role.name);
    });
    resolve(rolesList);
  });
};
