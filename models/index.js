'use strict'
const mongoose = require('mongoose');
const config = require('config-lite').mongodb;

mongoose.connect(config.url, (err) => {
  if(err){
    console.log('connect to %s error: ', config.url, err.message);
    process.exit(1);
  }
});

module.exports = {
  User: require('./user.js'),
  Topic: require('./topic.js'),
  Comment: require('./comment.js')
};
