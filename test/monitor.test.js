require('dotenv').config();
const Monitor = require('../lib/models/Monitor');
const Temperature = require('../lib/models/Temperature');

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

  it('saves the temperature', async() => {
    const monitor = await Monitor.create({ name: 'test' });
    return request(app)
      .post(`/temp/${monitor._id}`)
      .send({ temperature: 32.56 })
      .then(res => {
        expect(res.body).toEqual({
          temperature: 32.56,
          _id: expect.any(String),
          monitor: expect.any(String),
          __v:0
        });
      });
  });

  it('gets all Monitors', async() => {
    const monitor = await Monitor.create([
      { name: 'Pennsylvania' },
      { name: 'Ohio' },
      { name: 'Oregon' }
    ]);

    return request(app)
      .get('/')
      .then(res => {
        const monitorsJSON = JSON.parse(JSON.stringify(monitor));
        monitorsJSON.forEach(monitor => {
          expect(res.body).toContainEqual({
            name: monitor.name,
            _id: monitor._id
          });
        });
      });
  });
});
