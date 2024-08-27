const express = require('express')
const app = express()
const { getTopics } = require('./controllers/topics.controllers.js')
const { getApi } = require('./controllers/api.controllers.js')
const { getArticlesById } = require('./controllers/articles.controllers.js')


app.get('/api/topics', getTopics)
app.get('/api', getApi)
app.get('/api/articles/:article_id', getArticlesById)

app.use((err, req, res, next) => {
    if(err.status && err.msg){
        res.status(err.status).send({msg: err.msg})
    }else{
        next(err)
    }
})
app.use((err, req, res, next) => {
    if(err.code === '22P02'){
        res.status(400).send({msg: 'Bad Request'})
    }else{
        next(err)
    }
})


module.exports = app