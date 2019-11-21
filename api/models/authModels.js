const db = require('../../data/dbConfig');
// const jwt = require('jsonwebtoken');

module.exports = {
    getAllUsers,
    findById,
    findBy,
    addUser
}

function getAllUsers(){
    return db('users')
}

function findById(id){
    return db('users')
        .where({ id })
        .first()
}

function findBy(parameter){
    return db('users')
        .where(parameter)
        .first();
        // .update({ jwt: parameter.jwt })
}

async function addUser(user){
    // return null
    const [id] = await db('users').insert(user, 'id');
    return findById(id)
}

