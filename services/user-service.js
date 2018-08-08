const mongoService = require('./mongo-service');

const ObjectId = require('mongodb').ObjectId;


function checkLogin(userInfo) {
    console.log('email transferred to backend uesr service: ', userInfo)
    return mongoService.connect()
        .then(db => db.collection('user').findOne({ password: userInfo.password, email: userInfo.email }))
<<<<<<< HEAD

=======
        // .then(user => {
        //     console.log('user found in DB  user from a then!!!!: ', user)
        //     if (user._id) return Promise.resolve(user)
        //     else return Promise.reject
        //     //return user;
        // })
>>>>>>> 7e6e6425f797a50836d63d18f77896af26b56363
}


function getById(userId) {
    const _id = new ObjectId(userId)
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


function addUser(newUser) {
    return mongoService.connect()
        .then(db => {
            const collection = db.collection('user');
            return collection.insertOne(newUser)
                .then(_ => {
                    return newUser;
                })
        })
}





module.exports = {
    query,
    getById,
    checkLogin,
    addUser,
}