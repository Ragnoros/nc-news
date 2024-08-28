const { selectUsers } = require("../models/users.models");

exports.getUsers = (req, res, next) => {
  selectUsers().then((data) => {
    res.status(200).send(data);
  });
};
