require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const Temperature = require('../lib/models/Temperature');

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

  it('can get all the temperatures', async() => {
    const temp = await Temperature.create([
      { temperature: 25 },
      { temperature: 50 }
    ]);
    return request(app)
      .get('/temp')
      .then(res => {
        const tempJSON = JSON.parse(JSON.stringify(temp));
        tempJSON.forEach(temp => {
          expect(res.body).toContainEqual({
            temperature: temp.temperature,
            _id: temp._id
          });
        });  
      });
  });
});
