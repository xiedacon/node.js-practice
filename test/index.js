'use strict'

const request = require('co-supertest');
const app = require('../app.js');

describe('/index', () => {
  let agent = request.agent(app);

  it('GET /index must 200', function* (){
    yield agent.get('/index').expect(200).end();
  });
});
