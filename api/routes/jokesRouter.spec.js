/* eslint-disable no-undef */
const db = require('../../data/dbConfig')
const request = require('supertest');
const server = require('../server');
const bcrypt = require('bcryptjs');

beforeEach(async () => {
    await db('jokes').truncate()
})

describe('jokes routes tests', () => {

    describe('GET / for all jokes when token is provided', () => {
        test('get token back from login and can get all jokes', async () => {
            await db('users').insert({
                username: 'test',
                password: bcrypt.hashSync('1234', 10),
                email: 'test@test.com'
            })
            const response =  await request(server)
            .post('/api/auth/login')
            .send({ username: 'test', password: '1234'})

            const token = response.body.token;
            console.log(token);
            const responseAfterToken = await request(server).get("/api/jokes").set("authorization", token);
            expect(responseAfterToken.body.length).toEqual(0);
        })
     })

     describe('tests for 403 FORBIDDEN if no token when hitting jokes endpoints', () => {
        test("Should return 403 when no token provided", async () => {
            const responseAllJkes = await request(server).get("/api/jokes");
            expect(responseAllJkes.status).toBe(403);
            const responseJokeById = await request(server).get("/api/jokes/:id");
            expect(responseJokeById.status).toBe(403);
            const responsePostJoke = await request(server).post("/api/jokes/");
            expect(responsePostJoke.status).toBe(403);
            const responseEditJokeById = await request(server).put("/api/jokes/:id");
            expect(responseEditJokeById.status).toBe(403);
            const responseDeleteJokeById = await request(server).delete("/api/jokes/:id");
            expect(responseDeleteJokeById.status).toBe(403);
        });
     })
       
})