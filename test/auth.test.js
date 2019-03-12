/* eslint-env jest */
const faker = require('faker');
const request = require('supertest');

const app = require('../app');
const db = require('../db');

const fakeUser = {
  email: faker.internet.email(),
  password: faker.internet.password(),
};

describe('Auth Routes', () => {
  beforeAll(() => {
    db.users.list().forEach(user => db.users.delete(user.id));
    db.users.create({ email: fakeUser.email, password: fakeUser.password });
  });

  afterAll(() => {
    db.users.list().forEach(user => db.users.delete(user.id));
  });

  describe('/auth/login', () => {
    it('should login an user', async () => {
      const response = await request(app)
        .post('/auth/login')
        .send({
          email: fakeUser.email,
          password: fakeUser.password,
        })
        .expect(200);

      const cookie = response.headers['set-cookie'][0]
        .split(';')
        .map(item => item.split(';')[0])
        .join(';');

      expect(cookie).toContain('token');
      expect(response.body.email).toBe(fakeUser.email);
    });
  });

  it('should display an error if password is incorrect', async () => {
    const response = await request(app)
      .post('/auth/login')
      .send({
        email: fakeUser.email,
        password: faker.internet.password(),
      })
      .expect(400);

    expect(response.body.message).toBe('Wrong Password');
  });

  it('should display an error if user is not found', async () => {
    const response = await request(app)
      .post('/auth/login')
      .send({
        email: faker.internet.email(),
        password: faker.internet.password(),
      })
      .expect(400);

    expect(response.body.message).toBe('Unexistent User');
  });
});
