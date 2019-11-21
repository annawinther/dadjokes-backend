/* eslint-disable no-undef */
const db = require('../../data/dbConfig')
const request = require('supertest');
const server = require('../server');
const bcrypt = require('bcryptjs');

beforeEach(async () => {
    await db('jokes').truncate()
})

describe('jokes routes tests', () => {

    describe('GET /', async () => {
        test('get token back from login', async () => {
            await db('users').insert({
                username: 'test',
                password: bcrypt.hashSync('1234', 10),
                email: 'test@test.com'
            })
            const response =  await request(server)
            .post('/api/auth/login')
            .send({ username: 'test', password: '1234'})
            .set('Content-Type', 'aaplication/json')
            // expect(response.body.token).toBeTruthy

            const token = response.body.token;
            console.log(token);
            const response3 = await request(server).get("/api/jokes").set("authorization",token);
            expect(response3.body.length).toEqual(0);
        })
     })
       
})