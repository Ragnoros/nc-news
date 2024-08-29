const db = require("../db/connection");
const format = require("pg-format");

exports.selectArticlesById = (id) => {
  return db
    .query("SELECT * FROM articles WHERE article_id = $1", [id])
    .then((data) => {
      if (data.rows.length === 0)
        return Promise.reject({ status: 404, msg: "Not Found" });
      return data.rows;
    });
};
exports.selectArticles = () => {
  return db
    .query(
      "SELECT article_id, title, topic, author, created_at, votes, article_img_url FROM articles ORDER BY created_at DESC"
    )
    .then((data) => {
      return data.rows;
    });
};

exports.selectArticleComments = (id) => {
  return db
    .query(
      "SELECT * FROM comments WHERE article_id = $1 ORDER BY created_at DESC",
      [id]
    )
    .then(({ rows }) => {
      if (!rows.length)
        return Promise.reject({ status: 404, msg: "Not Found" });
      return rows;
    });
};

exports.insertArticleComments = (username, body, id) => {
  const insertVal = [username, body, id];
  return db
    .query(
      "INSERT INTO comments (author, body, article_id) VALUES ($1, $2, $3) RETURNING *",
      insertVal
    )
    .then((data) => {
      return data.rows[0];
    });
};

exports.updateArticle = (inc_votes, id) => {
  const insertVal = [inc_votes, id];
  return db
    .query(
      "UPDATE articles SET votes = votes + $1 WHERE article_id = $2 RETURNING *",
      insertVal
    )
    .then(({ rows }) => {
      if (!rows.length)
        return Promise.reject({ status: 404, msg: "Not Found" });
      return rows[0];
    });
};

exports.sortArticle = (sort_by, order = "asc") => {
  if (order === "")
    return Promise.reject({ status: 404, msg: "Invalid Query" });
  const sql = format("SELECT * FROM articles ORDER BY %I %s", sort_by, order);
  return db.query(sql).then(({ rows }) => {
    return rows;
  });
};
