'use strict'
const User = require('../models').User;
const request = require('co-supertest');
const app = require('../app.js');

describe('/signup', () => {
  let agent = request.agent(app);

  before((done) => {
    User.remove({name: 'test'}, done);
  });
  after((done) => {
    User.remove({name: 'test'}, done);
  });

  it('GET /signup without cookie', function* (){
    yield agent.get('/signup').expect(200).end();
  });
  it('POST /signup without cookie', function* (){
    yield agent
      .post('/signup')
      .send({
        name: 'test',
        email: 'test@qq.com',
        password: '123456',
        re_password: '123456',
        gender: '男',
        signature: 'just a test'
      })
      .expect(302)
      .end();
  });
  it('GET /signup with cookie', function* (){
    yield agent.get('/signup').expect(200).end();
  });
  it('POST /signup with cookie', function* (){
    yield agent
      .post('/signup')
      .send({
        name: 'test',
        email: 'test@qq.com',
        password: '123456',
        re_password: '123456',
        gender: '男',
        signature: 'just a test'
      })
      .expect(302)
      .end();
  });
})
