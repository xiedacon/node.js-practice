'use strict'

const request = require('co-supertest');
const app = require('../app.js');

describe('/logout', () => {
  let agent = request.agent(app);

  it('GET /logout without cookie', function* (){
    yield agent.get('/logout').expect(302).end();
  });

  it('GET /logout with cookie', function* (){
    yield agent.get('')
    yield agent.get('/logout').expect(200).end();
  });
});
