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

function getByOwnerId(ownerId) {
    ownerId = new ObjectId(ownerId)
    return mongoService.connect()
        .then(db => {
            const collection = db.collection('parking');
            return collection.find({ ownerId: ownerId }).toArray();
        })
}

function getByReservedId(rsvId) {
    rsvId = new ObjectId(rsvId)
    return mongoService.connect()
        .then(db => {
            const collection = db.collection('parking');
            return collection.find({ reserverId: rsvId }).toArray();
        })
}
function add(parking) {
    parking.ownerId = new ObjectId(parking.ownerId);
    parking.createdAt = Date.now(); 
    return mongoService.connect()
        .then(db => {
            const collection = db.collection('tester');
            return collection.insertOne(parking)
                .then(result => {
                    parking._id = result.insertedId;
                    return parking;
                })
        })
}



function reserve(rsv) {
    rsv.reserverId = new ObjectId(rsv.reserverId)
    rsv.parkingId = new ObjectId(rsv.parkingId)
    console.log(rsv)
    return mongoService.connect()
        .then(db => {
            const collection = db.collection('parking');
            return collection.updateOne({ _id: rsv.parkingId }, 
                             { $set:{reserverId: rsv.reserverId, occupiedUntil: rsv.occupiedUntil} })
                .then(result => {                    
                    return rsv;
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
    update,
    reserve,
    getByOwnerId,
    getByReservedId
}
