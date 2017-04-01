'use strict'
const Topic = require('../models').Topic;
const request = require('co-supertest');
const app = require('../app.js');

describe('/topic/_id', () => {
  let agent = request.agent(app);
  let id;

  before(function* (done) {
    yield [User.create({
      name: 'test',
      email: 'test@qq.com',
      password: '123456',
      re_password: '123456',
      gender: '男',
      signature: 'just a test'
    }),
    (id = Topic.findOne({name: 'test'}).exec().id))
    ];
    Topic.create({
      tab: '问答',
      title: 'test',
      content: 'this is a test'
    }, done);
  });
  after(function* (done) {
    yield User.remove({name: 'test'});
    Topic.remove({id: id}, done);
  });

  it('GET /topic/_id must 200', function* (){
    yield agent.get(`/topic/${id}`).expect(200).end();
  });
});
