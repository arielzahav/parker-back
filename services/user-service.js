const mongoService = require('./mongo-service');

const ObjectId = require('mongodb').ObjectId;


<<<<<<< HEAD
function checkLogin(user) {
    console.log('email transferred to backend uesr service: ', user)
    return mongoService.connect()
        .then(db => db.collection('user').findOne({ eMail: user.email}))
        .then(user => {
            console.log('user found in DB: ', user)            
            if (user._id) return Promise.resolve(user)
            else return Promise.reject
        })
=======
function checkLogin(mail) {
    console.log('mail:',mail)
    return mongoService.connect()
        .then(db => db.collection('user').findOne(mail))
>>>>>>> cace69c8b755c4b1c8a1a02e5d54fde87184f163
}


function getById(id) {
    console.log('get by id: ', id)
    const _id = new ObjectId(id)
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
<<<<<<< HEAD
=======
    checkLogin
>>>>>>> cace69c8b755c4b1c8a1a02e5d54fde87184f163
}