const { selectArticlesById, selectArticles  } = require('../models/articles.models')

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