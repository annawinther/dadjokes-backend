/* eslint-disable no-undef */
const db = require('../../data/dbConfig')
const request = require('supertest');
const server = require('../server');
// const Users = require('../models/authModels')
const bcrypt = require('bcryptjs');

beforeEach(async () => [
    await db('users').truncate()
]);

describe('auth routes tests', () => {
    
    describe('POST /register',  () => {
        test('should regster a new user', async () => {
            const newUser = await request(server)
            .post('/api/auth/register')
            .send({ username: 'zara', password: '1234', email: 'zara@test.com'});
            expect(newUser.body.username).toMatch(/zara/)
        })

        test('should return a status of 201', async () => {
            const response = await request(server)
            .post('/api/auth/register')
            .send({ username: 'zara', password: '1234', email: 'zara@test.com' })
            expect(response.status).toBe(201)
        })
    })

    describe('POST /login', () => {
        test('should return 200 OK', async () => {
            await db('users').insert({
                username: 'zara',
                password: bcrypt.hashSync('1234', 10),
                email: 'zara@test.com',
            })
            const response =  await request(server)
            .post('/api/auth/login')
            .send({ username: 'zara', password: '1234'})
            expect(response.status).toBe(200)
        })
        test('should get token back', async () => {
            await db('users').insert({
                username: 'zara',
                password: bcrypt.hashSync('1234', 10),
                email: 'zara@test.com'
            })
            const response =  await request(server)
            .post('/api/auth/login')
            .send({ username: 'zara', password: '1234'})
            .set('Content-Type', 'aaplication/json')
            expect(response.body.token).toBeTruthy
        })
    })
})