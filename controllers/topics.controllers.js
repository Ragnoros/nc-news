const {selectTopics} = require('../models/topics.models')


exports.getTopics = (req, res, next) => {
    selectTopics().then((data) => {
        res.status(200).send(data)
    })
}