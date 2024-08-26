const request = require('supertest')
const app = require('../app')



describe('Endpoint Tests', () => {
    describe('/api/', () => {
        test('200: get 200 response', () => {
            return request(app).get('/api').expect(200)
        })
        test('200: get an object back containing endpoint data', () => {
            return request(app).get('/api').expect(200).then(({body}) => {
                expect(typeof body).toBe('object')
                expect(body).toHaveProperty('GET /api')
                expect(body).toHaveProperty('GET /api/topics')
                expect(body).toHaveProperty('GET /api/articles')
            })
        })
        test('404: get 404 response from incorrect path', () => {
            return request(app).get('/abc').expect(404)
        })
    })
})