/* eslint-disable no-undef */
const db = require('../../data/dbConfig')
const request = require('supertest');
const server = require('../server');

beforeEach(async () => {
    await db('jokes').truncate()
})

describe('jokes routes tests', () => {
    
    describe('GET /',  () => [
        it('should return 200 OK', () => {
            return request(server).get('/api/public-jokes')
            .expect(200)
            // .then(res => {
            //     expect(res.body).toBe("Server running")
            // })
        })
    ])
})