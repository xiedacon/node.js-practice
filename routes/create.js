'use strict'
const $Topic = require('../lib/core').$Topic;

module.exports = {
  get: function* (){
    yield this.render('create');
  },
  post: function* (){
    let data = this.request.body;
    data.user = this.session.user;
    let topic = yield $Topic.addTopic(data);
console.log(topic);
    this.flash = {success: '发布成功!'};
    this.redirect(`/topic/${topic._id}`);
  }
};
