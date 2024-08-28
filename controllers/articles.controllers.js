const { selectArticlesById, selectArticles, selectArticleComments, insertArticleComments  } = require('../models/articles.models')

exports.getArticlesById = (req, res, next) => {
    const {article_id} = req.params
    selectArticlesById(article_id).then((data) => {
        res.status(200).send(data)
    })
    .catch((err) => {
        next(err)
    })
}

exports.getArticles = (req, res, next) => {
    selectArticles().then((data) => {
        res.status(200).send(data)
    })
}

exports.getArticleComments = (req, res, next) => {
    const {article_id} = req.params
    selectArticleComments(article_id).then((data) => {
        res.status(200).send(data)
    })
    .catch((err) => {
        next(err)
    })
}

exports.postArticleComments = (req, res, next) => {
    const {username, body} = req.body
    const {article_id} = req.params
    insertArticleComments(username, body, article_id).then((data) => {
        res.status(200).send({comment: data})
    })
    .catch((err) => {
        next(err)
    })
}