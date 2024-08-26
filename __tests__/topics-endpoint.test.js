const data = require('../db//data/test-data')
const request = require('supertest')
const seed = require('../db/seeds/seed')
const app = require('../app')
const db = require('../db/connection')

beforeEach(() => seed(data));
afterAll(() => db.end());

describe('Topics Endpoint Testing', () => {
    describe('/api/topics', () => {
        test('200: get 200 response', () => {
            return request(app).get('/api/topics').expect(200)
        })
        test('200: returns an array with data from topics table', () => {
            return request(app).get('/api/topics').expect(200).then(({body}) => {
                expect(typeof body).toBe('object')
                body.forEach(topic => {
                    expect(topic).toHaveProperty('slug')
                    expect(topic).toHaveProperty('description')
                })
            })
        })
        test('404: get 404 response', () => {
            //I didn't know how to properly catch this one like the other errors?
            //The system just produces the 404 on it's own when the endpoint is spelt wrong
            return request(app).get('/api/top').expect(404)
        })
    })
})