const {
  selectArticlesById,
  selectArticles,
  selectArticleComments,
  insertArticleComments,
  updateArticle,
  sortArticle,
} = require("../models/articles.models");

exports.getArticlesById = (req, res, next) => {
  const { article_id } = req.params;
  selectArticlesById(article_id)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      next(err);
    });
};

exports.getArticles = (req, res, next) => {
  let sort_by = "created_at";
  const { order } = req.query;
  if (req.query.sort_by) sort_by = req.query.sort_by;
  if (Object.keys(req.query).length === 0) {
    selectArticles().then((data) => {
      res.status(200).send(data);
    });
  } else if (sort_by || order) {
    sortArticle(sort_by, order)
      .then((data) => {
        res.status(200).send(data);
      })
      .catch((err) => {
        next(err);
      });
  }
};

exports.getArticleComments = (req, res, next) => {
  const { article_id } = req.params;
  selectArticleComments(article_id)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      next(err);
    });
};

exports.postArticleComments = (req, res, next) => {
  const { username, body } = req.body;
  const { article_id } = req.params;
  insertArticleComments(username, body, article_id)
    .then((data) => {
      res.status(200).send({ comment: data });
    })
    .catch((err) => {
      next(err);
    });
};

exports.patchArticle = (req, res, next) => {
  const { inc_votes } = req.body;
  const { article_id } = req.params;
  updateArticle(inc_votes, article_id)
    .then((data) => {
      res.status(200).send({ article: data });
    })
    .catch((err) => {
      next(err);
    });
};
