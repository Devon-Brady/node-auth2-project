const db = require('../../data/connection')

function find(){
    return db('users')
}

function findby(filter){
    return db("users")
    .select("users.id","users.username","users.password")
    .where(filter);
}

async function add (user){
    const [id] = await db("users").insert(user, "id");
    return findById(id);
}

function findById(id){
    return db("users")
    .select("users.id","users.username")
    .where("users.id", id)
    .first();
}

module.exports = {
    find,
    findById,
    findby,
    add
}