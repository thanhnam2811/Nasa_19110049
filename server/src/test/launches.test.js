const app = require('../app');
const request = require('supertest');

// Test get all launches
describe('GET /launches', () => {
    it('should return 200 OK with json and array of launches', () =>
        request(app)
            .get('/launches')
            .expect(200)
            .expect('Content-Type', /json/)
            .expect((res) => {
                expect(res.body).toBeInstanceOf(Array);
            }));
});

// Test add new launch
describe('POST /launches', () => {
    it('should return 201 created with json', () =>
        request(app)
            .post('/launches')
            .send({
                mission: 'Kepler Exploration X',
                rocket: 'Explorer IS1',
                launchDate: 'December 27, 2030',
                target: 'Kepler-442 b',
            })
            .expect(201)
            .expect('Content-Type', /json/)
            .expect((res) => {
                expect(res.body).toMatchObject({
                    mission: 'Kepler Exploration X',
                    rocket: 'Explorer IS1',
                    launchDate: new Date('December 27, 2030').toISOString(),
                    target: 'Kepler-442 b',
                });
            }));
});

// Test delete launch
describe('DELETE /launches', () => {
    it('should return 200 OK with json', () =>
        request(app)
            .delete('/launches/100')
            .expect(200)
            .expect('Content-Type', /json/)
            .expect((res) => {
                expect(res.body).toMatchObject({
                    flightNumber: 100,
                });
            }));
});
