const app = require('../app');
const request = require('supertest');
const { mongooseConnect, mongooseDisconnect } = require('../services/mongo');
const { loadPlanetsData } = require('../models/planets.model');

// Test get all planets
describe('TEST planets', () => {
    beforeAll(async () => {
        await mongooseConnect();
        await loadPlanetsData();
    });

    afterAll(async () => {
        await mongooseDisconnect();
    });

    describe('GET /planets', () => {
        test('It should respond with 200 success', async () => {
            await request(app)
                .get('/planets')
                .expect('Content-Type', /json/)
                .expect(200);
        });
    });
});
