'use strict'
const Topic = require('../models').Topic;
const User = require('../models').User;
const request = require('co-supertest');
const app = require('../app.js');

describe('/create', () => {
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
  after(function* (done) {
    yield User.remove({name: 'test'});
    Topic.remove({title: 'test'},done);
  });

  it('GET /create without cookie', function* (){
    yield agent.get('/create').expect(302).end();
  });
  it('POST /create without cookie', function* (){
    yield agent
      .post('/create')
      .send({
        tab: '问答',
        title: 'test',
        content: 'this is a test'
      })
      .expect(302)
      .end();
  });
  it('GET /create with cookie', function* (){
    yield agent
      .post('/signin')
      .send({
        name: 'test',
        password: '123456',
      })
      .expect(302)
      .end();
    yield agent.get('/create').expect(200).end();
  });
  it('POST /create with cookie', function* (){
    yield agent
      .post('/create')
      .send({
        tab: '问答',
        title: 'test',
        content: 'this is a test'
      })
      .expect(302)
      .end();
  });
})
