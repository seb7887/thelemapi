/* eslint-env jest */
const faker = require('faker');
const request = require('supertest');

const app = require('../app');
const db = require('../db');

const fakeUser = {
  email: faker.internet.email(),
  password: faker.internet.password(),
};

const registerUser = async user => {
  const response = await request(app)
    .post('/auth/register')
    .send({
      email: user.email,
      password: user.password,
    })
    .expect(200);

  const cookie = response.headers['set-cookie'][0]
    .split(';')
    .map(item => item.split(';')[0])
    .join(';');

  expect(response.body.email).toBe(user.email.toLowerCase());

  return cookie;
};

describe('User Routes', () => {
  beforeEach(() => {
    db.users.list().forEach(user => db.users.delete(user.id));
  });

  afterAll(() => {
    db.users.list().forEach(user => db.users.delete(user.id));
  });

  describe('/auth/register', () => {
    it('should register a new user', async () => {
      const cookie = await registerUser(fakeUser);

      expect(cookie).toContain('token');
    });

    it('should not register a new user if inputs are not validated', async () => {
      const response = await request(app)
        .post('/auth/register')
        .send({
          email: faker.internet.email(),
          password: '123',
        })
        .expect(400);

      expect(response.text).toContain(
        'Password must be between 4 and 22 characters'
      );
    });
  });

  describe('/users', () => {
    it('should get all users if token is provided', async () => {
      const cookie = await registerUser(fakeUser);
      const token = cookie.split(';')[0].split('=')[1];

      const response = await request(app)
        .get('/users')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      expect(response.body.users).toHaveLength(1);
    });

    it('should not get all users if token is not provided', async () => {
      const response = await request(app)
        .get('/users')
        .expect(401);

      expect(response.text).toContain('Unauthorized');
    });

    it('should not get all users if token not correspond to any user', async () => {
      const response = await request(app)
        .get('/users')
        .set('Authorization', `Bearer ${faker.random.uuid()}`)
        .expect(401);

      expect(response.text).toContain('Unauthorized');
    });
  });
});
