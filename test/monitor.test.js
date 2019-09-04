require('dotenv').config();
const Monitor = require('../lib/models/Monitor');

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');

describe('app routes', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  it('sends 204', () => {
    return request(app)
      .get('/status')
      .then(res => {
        expect(res.status).toEqual(204);
      });
  });

  it('sends back id', () => {
    return request(app)
      .post('/register')
      .send({ name: 'Name' })
      .then(res => {
        expect(res.body).toEqual({
          id: expect.any(String)
        });
      });
  });

  it('sends 204 when id is deregistered', async() => {
    const monitor = await Monitor.create({ name: 'test' });
    return request(app)
      .delete('/deregister')
      .send({ id: monitor._id })
      .then(res => {
        expect(res.status).toEqual(204);
      });
  });
});
