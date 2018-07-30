const mongoService = require('./mongo-service');

const ObjectId = require('mongodb').ObjectId;


function checkLogin(user) {
    console.log('email transferred to backend uesr service: ', user.userInfo)
    return mongoService.connect()
        .then(db => db.collection('user').findOne({ password: user.userInfo.password, eMail: user.userInfo.email }))
        .then(user => {
            console.log('user found in DB blalalalala user from a then!!!!: ', user)
            if (user._id) return Promise.resolve(user)
            else return Promise.reject
        })
}
// { "attributes.id": 1, "attributes.value": 150 }
// { password: user.userInfo.password }, { eMail: user.userInfo.email }
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
}