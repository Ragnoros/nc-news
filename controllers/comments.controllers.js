const { deleteComment } = require("../models/comments.models");
exports.removeComment = (req, res, next) => {
  const { comment_id } = req.params;
  deleteComment(comment_id)
    .then((data) => {
      res.status(204).send(data);
    })
    .catch((err) => {
      next(err);
    });
};
