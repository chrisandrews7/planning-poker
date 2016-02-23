import request from 'supertest';
import httpStatus from 'http-status';

import app from '../../../index';

describe('Index Controller', () => {
  let server;

  beforeEach(() => {
    server = app.listen(3333);
  });

  afterEach((done) => {
    server.close(done);
  });

  it('responds to / and returns a html page', (done) => {
    request(server)
      .get('/')
      .expect('Content-Type', 'text/html; charset=UTF-8')
      .expect(httpStatus.OK, done);
  });
});
