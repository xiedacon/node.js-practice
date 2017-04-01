'use strict'
const $User = require('../lib/core.js').$User;

module.exports = {
  get : function* (){
    yield this.render('signup');
  },
  post : function* (){
    let data = this.request.body;

    let user = yield $User.getUserByName(data.name);
    if(user){
      this.flash = {error: '用户名已存在！'};
      return this.redirect('back');
    }

    yield $User.addUser(data);

    this.session.user = {
      name: data.name,
      email: data.email
    };

    this.flash = {success: '注册成功!'};
    this.redirect('/');
  }
};
