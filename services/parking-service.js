const mongoService = require('./mongo-service') 

const ObjectId = require('mongodb').ObjectId;


function query() {
    return mongoService.connect()
        .then(db => {
            const collection = db.collection('parking');
            return collection.find({}).toArray()
        })
}

function remove(parkingId) {
    parkingId = new ObjectId(parkingId)
    return mongoService.connect()
        .then(db => {
            const collection = db.collection('parking');
            return collection.remove({ _id: parkingId })
        })
}
function getById(parkingId) {
    parkingId = new ObjectId(parkingId)
    return mongoService.connect()
        .then(db => {
            const collection = db.collection('parking');
            return collection.findOne({ _id: parkingId })
        })
}

function add(parking) {
    return mongoService.connect()
        .then(db => {
            const collection = db.collection('parking');
            return collection.insertOne(parking)
                .then(result => {
                    parking._id = result.insertedId;
                    return parking;
                })
        })
}

function update(parking) {
    parking._id = new ObjectId(parking._id)
    return mongoService.connect()
        .then(db => {
            const collection = db.collection('parking');
            return collection.updateOne({ _id: parking._id }, { $set: parking })
                .then(result => {
                    return parking;
                })
        })
}

module.exports = {
    query,
    remove,
    getById,
    add,
    update
}
