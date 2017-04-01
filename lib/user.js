'use strict'
const User = require('../models').User;

module.exports = {
  addUser(data) {
    return User.create(data);
  },
  getUserById(id) {
    return User.findById(id).exec();
  },
  getUserByName(name) {
    return User.findOne({name: name}).exec();
  }
};
