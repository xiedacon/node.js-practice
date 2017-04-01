'use strict'
const Comment = require('../models').Comment;

module.exports = {
  addComment(data) {
    return Comment.create(data);
  },
  getCommentsByTopicId(id) {
    return Comment.find({topic_id: id}).sort('updated_at').exec();
  }
};
