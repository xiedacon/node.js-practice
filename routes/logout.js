'use strict'
module.exports = {
  get: function* (){
    this.session = null;
    this.redirect('back');
  }
}
