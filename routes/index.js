'use strict'

const $Topic = require('../lib/core').$Topic;

module.exports = {
  get: function* (){
    yield this.render('index', {
      topics: $Topic.getTopicsByTab(this.query.tab, this.query.p || 1)
    });
  }
};
