const db = require("../db/connection");

exports.deleteComment = (id) => {
  const values = [id];
  return db
    .query("DELETE FROM comments WHERE comment_id = $1 RETURNING *", values)
    .then(({ rows }) => {
      if (rows.length === 0)
        return Promise.reject({ status: 404, msg: "Not Found" });
      return rows[0];
    });
};
