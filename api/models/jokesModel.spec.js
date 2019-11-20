/* eslint-disable no-undef */
const db = require('../../data/dbConfig');
const Jokes = require('./jokesModel');

describe('jokes model', () => {
    beforeEach(async () => {
        await db('jokes').truncate();
    });

    describe("insert function", () => {
        it('should insert jokes into the databse', async () => {
            const jokesNo = await db('jokes');
            expect(jokesNo).toHaveLength(0)
        })
    })
})