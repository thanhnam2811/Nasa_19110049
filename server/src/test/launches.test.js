const app = require('../app');
const request = require('supertest');
const { mongooseConnect, mongooseDisconnect } = require('../services/mongo');
const { loadPlanetsData } = require('../models/planets.model');

describe('TEST launches', () => {
    beforeAll(async () => {
        await mongooseConnect();
        await loadPlanetsData();
    });

    afterAll(async () => {
        await mongooseDisconnect();
    });

    describe('GET /launches', () => {
        test('It should respond with 200 success', async () => {
            await request(app)
                .get('/launches')
                .expect('Content-Type', /json/)
                .expect(200);
        });
    });

    describe('POST /launches', () => {
        test('It should respond with 201 created', async () => {
            await request(app)
                .post('/launches')
                .send({
                    flightNumber: 100,
                    mission: 'Kepler Exploration X',
                    rocket: 'Explorer IS1',
                    launchDate: 'January 4, 2030',
                    target: 'Kepler-452 b',
                })
                .expect('Content-Type', /json/)
                .expect(201);
        });
    });

    describe('DELETE /launches', () => {
        test('It should respond with 200 success', async () => {
            await request(app)
                .delete('/launches/100')
                .expect('Content-Type', /json/)
                .expect(200);
        });
    });
});
