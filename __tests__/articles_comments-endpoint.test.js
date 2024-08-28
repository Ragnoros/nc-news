const data = require('../db//data/test-data')
const request = require('supertest')
const seed = require('../db/seeds/seed')
const app = require('../app')
const db = require('../db/connection')

beforeEach(() => seed(data));
afterAll(() => db.end());

describe('Testing Articles Comments Endpoint', () => {
    describe('GET /api/articles/:articles_id/comments', () => {
        test('200: get 200 response', () => {
            return request(app).get('/api/articles/1/comments').expect(200)
        })
        test('200: returns an array of article comments', () => {
            return request(app).get('/api/articles/1/comments').expect(200).then(({body}) => {
                body.forEach(comment => {
                    expect(typeof comment.comment_id).toBe('number')
                    expect(typeof comment.body).toBe('string')
                    expect(typeof comment.article_id).toBe('number')
                    expect(typeof comment.author).toBe('string')
                    expect(typeof comment.votes).toBe('number')
                    expect(typeof comment.created_at).toBe('string')
                })
            })
        })
        test('200: comments are ordered newest to oldest', () => {
            return request(app).get('/api/articles/1/comments').expect(200).then(({body}) => {
                expect(body[0].created_at).toBe('2020-11-03T21:00:00.000Z')
                expect(body[10].created_at).toBe('2020-01-01T03:08:00.000Z')
            })
        })
        test('404: get 404 response when article id does not exist', () => {
            return request(app).get('/api/articles/999999/comments').expect(404).then(({body}) => {
                expect(body.msg).toBe('Not Found')
            })
        })
        test('400: get 400 response when article id is a string', () => {
            return request(app).get('/api/articles/hello/comments').expect(400).then(({body}) => {
                expect(body.msg).toBe('Bad Request')
            })
        })
    })
    describe('POST /api/articles/:articles_id/comments', () => {
        test('200: get 200 response', () => {
            const body = {
                username: 'butter_bridge',
                body: 'Hello this is a comment'
            };
            return request(app).post('/api/articles/1/comments').send(body).expect(200)
        })
        test('200: post request returns the inserted object', () => {
            const body = {
                username: 'butter_bridge',
                body: 'Hello this is a comment'
            };
            return request(app).post('/api/articles/1/comments').send(body).expect(200).then(({body}) => {
                expect(body).toHaveProperty('comment')
                expect(body.comment).toHaveProperty('comment_id')
                expect(body.comment.author).toBe('butter_bridge')
                expect(body.comment.body).toBe('Hello this is a comment')
            })
        })
        test('404: get 404 response when article id does not exist', () => {
            const body = {
                username: 'butter_bridge',
                body: 'Hello this is a comment'
            };
            return request(app).post('/api/articles/1111111/comments').send(body).expect(404).then(({body}) => {
                expect(body.msg).toBe('Article Not Found')
            })
        })
        test('400: get 400 response when article id is string', () => {
            const body = {
                username: 'butter_bridge',
                body: 'Hello this is a comment'
            };
            return request(app).post('/api/articles/hello/comments').send(body).expect(400).then(({body}) => {
                expect(body.msg).toBe('Bad Request')
            })
        })
    })
})