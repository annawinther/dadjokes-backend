/* eslint-disable no-undef */
const db = require('../../data/dbConfig');
const Jokes = require('./jokesModel');

describe('jokes model', () => {
    beforeEach(async () => {
        await db('jokes').truncate();
    });

    describe("insert function", () => {
        it('should insert jokes into the databse', async () => {
            let jokesNo 
            jokesNo = await db('jokes');
            expect(jokesNo).toHaveLength(0); 
            await Jokes.addJoke({ 
                setup: "How do you check if a webpage is HTML5?",
                punchline: "Try it out on Internet Explorer",
                public: "false",
                user_id: 3
             });
            jokesNo = await db('jokes');
            expect(jokesNo).toHaveLength(1);
        })
    })
})