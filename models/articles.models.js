const db = require('../db/connection')

exports.selectArticlesById = (id) => {
    return db.query('SELECT * FROM articles WHERE article_id = $1', [id]).then((data) => {
        if (data.rows.length === 0) return Promise.reject({status: 404, msg: 'Not Found'})
        return data.rows
    })
}
exports.selectArticles = () => {
    return db.query('SELECT article_id, title, topic, author, created_at, votes, article_img_url FROM articles ORDER BY created_at DESC').then((data) =>{
        return data.rows
    })
}

exports.selectArticleComments = (id) => {
    return db.query('SELECT * FROM comments WHERE article_id = $1 ORDER BY created_at DESC', [id]).then(({rows}) => {
        if (!(rows.length)) return Promise.reject({status: 404, msg: 'Not Found'}) 
        return rows
    })
}