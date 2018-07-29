const mongoService = require('./mongo-service');

const ObjectId = require('mongodb').ObjectId;


function checkLogin(user) {
    console.log('email transferred to backend uesr service: ', user)
    return mongoService.connect()
        .then(db => db.collection('user').findOne({ eMail: user.email}))
        .then(user => {
            console.log('user found in DB: ', user)            
            if (user._id) return Promise.resolve(user)
            else return Promise.reject
        })
}


function getById(userId) {
    console.log('get by id: ', userId)
    const _id = new ObjectId(userId)
    console.log('userId: ', _id)
    return mongoService.connect()
        .then(db => db.collection('user').findOne({ _id }))
}



function query() {
    return mongoService.connect()
        .then(db => db.collection('user').find({}).toArray())
}

// // todo  - add user only if nickname is not taken
// function addUser({ nickname }) {
//     var user = { nickname }
//     return mongoService.connect()
//         .then(db => db.collection('user').insertOne(user))
//         .then(res => {
//             user._id = res.insertedId
//             return user
//         })
//  }







module.exports = {
    query,
    getById,
    checkLogin,
    // addUser,
}