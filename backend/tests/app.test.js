const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

const app = require('../src/app');
const { connectDb } = require('../src/config/db');

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await connectDb(mongoServer.getUri());
});

afterAll(async () => {
  await mongoose.connection.close();
  await mongoServer.stop();
});

describe('Auth + shopping + meal planning', () => {
  it('registers a user and returns a token', async () => {
    const response = await request(app).post('/api/auth/register').send({
      email: 'user@example.com',
      password: 'Password123',
      name: 'Sample User'
    });

    expect(response.statusCode).toBe(201);
    expect(response.body.token).toBeDefined();
  });

  it('parses shopping list text', async () => {
    const response = await request(app)
      .post('/api/shopping/parse')
      .send({ inputText: 'Shopping list: milk, eggs, spinach' });

    expect(response.statusCode).toBe(200);
    expect(response.body.items.map((item) => item.name)).toEqual(['milk', 'eggs', 'spinach']);
  });

  it('creates vegetarian high-protein meal plan', async () => {
    const response = await request(app).post('/api/meals/plan').send({
      calories: 1800,
      protein: 100,
      dietaryRestrictions: ['vegetarian'],
      healthyOnly: true
    });

    expect(response.statusCode).toBe(200);
    expect(response.body.totals.protein).toBeGreaterThanOrEqual(100);
    expect(response.body.meals.length).toBeGreaterThan(0);
  });
});
