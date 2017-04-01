'use strict'
const app = require('../package.json');
const core = require('../../lib/core.js');

module.exports = {
  get $app () {
    return app;
  },
  get $User () {
    return core.$User;
  },
  get $Topic () {
    return core.$Topic;
  },
  get $Comment () {
    return core.$Comment;
  }
};
