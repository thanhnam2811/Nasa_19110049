const app = require('../app');
const request = require('supertest');

// Test get all planets
describe('GET /planets', () => {
    it('should return 200 OK with json', () =>
        request(app)
            .get('/planets')
            .expect(200)
            .expect('Content-Type', /json/));
});
