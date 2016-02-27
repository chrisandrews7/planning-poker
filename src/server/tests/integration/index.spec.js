import request from 'supertest';
import httpStatus from 'http-status';
import config from 'config';
import app from '../../index';

describe('App', () => {
  let server;

  beforeEach(() => {
    server = app.listen(config.get('port'));
  });

  afterEach((done) => {
    server.close(done);
  });

  it('returns a 404 for a page that doesnt exist', (done) => {
    request(server)
      .get('/page-doesnt-exist')
      .expect(httpStatus.NOT_FOUND, done);
  });
});
