/* eslint-disable no-undef */
const db = require('../../data/dbConfig');
const Jokes = require('./jokesModel');

describe('jokes model', () => {
    beforeEach(async () => {
        await db('jokes').truncate();
    });
    
    describe('it should not be anything in db', () => {
        it('Should be empty', async () => {
            const jokes = await db('jokes');
            expect(jokes).toHaveLength(0);
        })
    })

    describe("insert jokes function", () => {
        it('should insert jokes into the databse', async () => {
            await Jokes.addJoke({ 
                setup: "How do you check if a webpage is HTML5?",
                punchline: "Try it out on Internet Explorer",
                public: "false",
                user_id: 3
             });
            jokesNo = await db('jokes');
            expect(jokesNo).toHaveLength(1);
        })
        test('should set public to false', async () => { 
            let joke = await Jokes.addJoke({ 
                setup: "How do you check if a webpage is HTML5?",
                punchline: "Try it out on Internet Explorer",
                public: "false",
                user_id: 3
             });
            expect(joke.public).toBe('false')
        })
    });

    describe("delete jokes function", () => {
        it('should delete joke from the db', async () => {
            // Make a new joke
            let newJoke = await Jokes.addJoke({ 
                setup: "NewJoke",
                punchline: "Just for testing, is deleted upon test",
                public: "false",
                user_id: 1
             });

             //Delete the joke
             let deletedJoke = await Jokes.deleteJoke(newJoke.id); 

             //Expect deletion to return to ID of the deleted joke
             expect(deletedJoke).toBe(newJoke.id);

             //Delete the joke

        })
    });
    
    describe('update jokes function', () => {
        it('should update joke from the db', async () => {

            // Make a new joke
            let newJoke = await Jokes.addJoke({ 
                setup: "NewJoke",
                punchline: "Just for testing, is deleted upon test",
                public: "false",
                user_id: 1
             });
            
            // Create an updated joke object
            let updatedJokeBody = {
                setup: "UpdatedNewJoke"
            };

            // Updated the new joke just created (newJoke.id) with updatedJokeBody
            await Jokes.updateJoke(newJoke.id, updatedJokeBody)
            
            //Get the updated joke with ID = newJoke.id
            const getUpdatedJoke = await db('jokes').where({id:newJoke.id});

            //Expect that setup = "UpdatedNewJoke"
            expect(getUpdatedJoke[0].setup).toMatch(/UpdatedNewJoke/)

            //Delete the new joke, as we do not need it
            console.log(await Jokes.deleteJoke(newJoke.id)); 
        })
    })
})