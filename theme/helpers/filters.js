const gravatar = require('gravatar');
const moment = require('moment');
const md = require('markdown-it')();
const pkg = require('../package.json');

moment.locale(pkg.locale);

module.exports = {
  get fromNow () {
    return function (date) {
      return moment(date).fromNow();
    };
  },
  get gravatar () {
    return gravatar.url;
  },
  get markdown () {
    return function (content) {
      return md.render(content);
    };
  }
};
