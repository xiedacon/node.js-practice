'use strict'
const $User = require('../lib/core').$User;

module.exports = {
  get: function* (){
    yield this.render('signin');
  },
  post: function* (){
    let data = this.request.body;

    let user = yield $User.getUserByName(data.name);
    if(!user || user.password !== data.password){
      this.flash = {error: '用户名或密码错误!'};
      return this.redirect('back');
    }
    this.session.user = {
      name: user.name,
      email: user.email
    };
    this.flash = {success: '登录成功!'};
    this.redirect(`/user/${user.name}`);
  }
};
