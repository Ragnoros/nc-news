const express = require("express");
const app = express();
const { getTopics } = require("./controllers/topics.controllers.js");
const { getApi } = require("./controllers/api.controllers.js");
const {
  getArticlesById,
  getArticles,
  getArticleComments,
  postArticleComments,
  patchArticle,
} = require("./controllers/articles.controllers.js");
const { removeComment } = require("./controllers/comments.controllers.js");
const { getUsers } = require("./controllers/users.controllers.js");
const cors = require("cors");
app.use(cors());
app.use(express.json());

app.get("/api/topics", getTopics);
app.get("/api", getApi);
app.get("/api/articles/:article_id", getArticlesById);
app.get("/api/articles", getArticles);
app.get("/api/articles/:article_id/comments", getArticleComments);
app.get("/api/users", getUsers);

app.post("/api/articles/:article_id/comments", postArticleComments);

app.patch("/api/articles/:article_id", patchArticle);

app.delete("/api/comments/:comment_id", removeComment);

app.use((err, req, res, next) => {
  if (err.status && err.msg) {
    res.status(err.status).send({ msg: err.msg });
  } else {
    next(err);
  }
});
app.use((err, req, res, next) => {
  if (err.code === "22P02") {
    res.status(400).send({ msg: "Bad Request" });
  } else {
    next(err);
  }
});

app.use((err, req, res, next) => {
  if (err.code === "23503") {
    res.status(404).send({ msg: "Article Not Found" });
  } else {
    next(err);
  }
});

module.exports = app;
