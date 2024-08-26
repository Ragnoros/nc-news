const {selectApi} = require('../models/api.models')

exports.getApi = (req, res, next) => {
    selectApi().then((data) => {
        res.status(200).send(data)
    })
}