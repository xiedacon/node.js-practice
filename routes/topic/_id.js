'use strict'
const $Topic = require('../../lib/core').$Topic;
var $Comment = require('../../lib/core').$Comment;


module.exports = {
  get: function* (id){
    yield this.render('topic', {
      topic: $Topic.getTopicById(id),
      comments: $Comment.getCommentsByTopicId(id)
    });
  },
  post: function* (id){
    var data = this.request.body;
    data.user = this.session.user;

    yield [
      $Comment.addComment(data),
      $Topic.incCommentById(id)
    ];

    this.flash = {success: '回复成功!'};
    this.redirect(this.query.redirect || 'back');
  }
};
