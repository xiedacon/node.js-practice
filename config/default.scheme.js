'use strict'
const validator = require('validator');
const crypto = require('crypto');

module.exports = {
  "(GET|POST) /signup": {
    "request.session": checkNotLogin
  },
  "POST /signup": {
    "request.body": checkSignUpBody
  },
  "(GET|POST) /signin": {
    "request.session": checkNotLogin
  },
  "POST /signin": {
    "request.body": checkSigninBody
  },
  "(GET|POST) /create": {
    "request":{
      "session": checkLogin
    }
  },
  "POST /create": {
    "request.body": checkCreateBody
  },
  "POST /topic/:id": {
    "request.session": checkLogin,
    "request.body": checkReplyTopic
  }
};

function m5(str){
  return crypto.createHash('md5').update(str).digest('hex');
}

function checkNotLogin(){
  if(this.session && this.session.user){
    this.flash = {error: '已登录！'};
    this.redirect('back');
    return false;
  }
  return true;
}

function checkLogin(){
  if(!this.session || !this.session.user){
    this.flash = {error: '未登录！'};
    this.redirect('/signin');
    return false;
  }
  return true;
}

function checkSignUpBody(){
  let body = this.request.body;
  let error = ((!body || !body.name) && '请填写用户名!')
      || ((body.email || validator.isEmail(body.email)) && '请填写正确邮箱地址!')
      || ((!body.password) && '请填写密码!')
      || ((body.password !== body.re_password) && '两次密码不匹配!')
      || (((!body.gender || ['男', '女'].indexOf(body.gender))) && '请选择性别!')
      || (((body.signature && body.signature.length > 50)) && '个性签名不能超过50字!');

  if(error){
    this.flash = {error: error};
    this.redirect('back');
    return false;
  }
  body.name = validator.trim(body.name);
  body.email = validator.trim(body.email);
  body.password = md5(validator.trim(body.password));
  return true;
}
function checkSigninBody(){
  let body = this.request.body;
  let error = ((!body || !body.name) && '请填写用户名!')
      || ((!body.password) && '请填写密码!');

  if(error){
    this.flash = {error: error};
    this.redirect('back');
    return false;
  }
  body.name = validator.trim(body.name);
  body.password = md5(validator.trim(body.password));
  return true;
}
function checkCreateBody(){
  let body = this.request.body;
  let error = ((!body || !body.title || body.title.length < 10) && '请填写合法标题!')
      || ((!body.tab) && '请选择版块!')
      || ((!body.content) && '请填写内容!');

  if(error){
    this.flash = {error: error};
    this.redirect('back');
    return false;
  }
  body.title = validator.trim(body.title);
  body.tab = validator.trim(body.tab);
  body.content = validator.trim(body.content);
  return true;
}
function checkReplyTopic(){
  let body = this.request.body;
  let error = ((!body || !body.topic_id || !validator.isMongoId(body.topic_id)) && '回复的帖子不存在!')
      || ((!body.content) && '回复的内容为空!');

  if (error) {
    this.flash = {error: error};
    this.redirect('back');
    return false;
  }
  body.content = validator.trim(body.content);
  return true;
}
