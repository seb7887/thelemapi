/* eslint-env jest */
const faker = require('faker');
const request = require('supertest');

const app = require('../app');
const db = require('../db');

describe('User Routes', () => {
  beforeEach(() => {
    db.users.list().forEach(user => db.users.delete(user.id));
  });

  afterAll(() => {
    db.users.list().forEach(user => db.users.delete(user.id));
  });

  describe('/register', () => {
    it('should register a new user', async () => {
      let fakeUser = {
        email: faker.internet.email(),
        password: faker.internet.password(),
      };

      const response = await request(app)
        .post('/auth/register')
        .send({
          email: fakeUser.email,
          password: fakeUser.password,
        })
        .expect(200);

      expect(response.body.email).toBe(fakeUser.email);
    });
  });
});
