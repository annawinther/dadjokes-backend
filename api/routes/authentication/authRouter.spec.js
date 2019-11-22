/* eslint-disable no-undef */
const db = require('../../../data/dbConfig')
const request = require('supertest');
const server = require('../../server');
const bcrypt = require('bcryptjs');

beforeEach(async () => [
    await db('users').truncate()
]);

describe('auth routes tests', () => {
    
    describe('POST /register',  () => {
        it('should regster a new user', async () => {
            const newUser = await request(server)
            .post('/auth/register')
            .send({ username: 'hanna', password: '1234', email: 'hanna@test.com'});
            expect(newUser.body.username).toMatch(/hanna/)
        })

        it('should return a status of 201', async () => {
            const response = await request(server)
            .post('/auth/register')
            .send({ username: 'hanna', password: '1234', email: 'hanna@test.com' })
            expect(response.status).toBe(201)
        })
    })

    describe('POST /login', () => {
        it('should return 200 OK', async () => {
            await db('users').insert({
                username: 'hanna',
                password: bcrypt.hashSync('1234', 10),
                email: 'hanna@test.com',
            })
            const response =  await request(server)
            .post('/auth/login')
            .send({ username: 'hanna', password: '1234'})
            expect(response.status).toBe(200)
        })
        it('should get token back', async () => {
            await db('users').insert({
                username: 'hanna',
                password: bcrypt.hashSync('1234', 10),
                email: 'hanna@test.com'
            })
            const response =  await request(server)
            .post('/auth/login')
            .send({ username: 'hanna', password: '1234'})
            .set('Content-Type', 'aaplication/json')
            expect(response.body.token).toBeTruthy
        })
    })
})