'use strict'
const User = require('../models').User;
const request = require('co-supertest');
const app = require('../app.js');

describe('/signup', () => {
  let agent = request.agent(app);

  before((done) => {
    User.create({
      name: 'test',
      email: 'test@qq.com',
      password: '123456',
      re_password: '123456',
      gender: '男',
      signature: 'just a test'
    }, done);
  });
  after((done) => {
    User.remove({name: 'test'}, done);
  });

  it('GET /signin without cookie', function* (){
    yield agent.get('/signin').expect(200).end();
  });
  it('POST /signin without cookie', function* (){
    yield agent
      .post('/signin')
      .send({
        name: 'test',
        password: '123456',
      })
      .expect(302)
      .end();
  });
  it('GET /signin with cookie', function* (){
    yield agent.get('/signin').expect(200).end();
  });
  it('POST /signin with cookie', function* (){
    yield agent
      .post('/signin')
      .send({
        name: 'test',
        password: '123456'
      })
      .expect(302)
      .end();
  });
})
