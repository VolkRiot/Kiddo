const request = require('supertest');
const router = require('./index');

describe('Test the root home path', () => {
    test('It should respond with status 200', () => {
        request(router)
        .get('/')
        .then(response => {
            expect(response.statusCode).toBe(200);
        });
    });
});
