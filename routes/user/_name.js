const $Topic = require('../../lib/core').$Topic;

module.exports = {
  get: function* (name) {
    yield this.render('user', {
      topics: $Topic.getTopicsByName(name),
      name: name
    });
  }
};
