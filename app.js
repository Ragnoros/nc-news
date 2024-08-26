const express = require('express')
const app = express()
const { getTopics } = require('./controllers/topics.controllers.js')
const { getApi } = require('./controllers/api.controllers.js')


app.get('/api/topics', getTopics)
app.get('/api', getApi)


module.exports = app