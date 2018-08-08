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

function getOwnedParkingsByUserId(userId) {
    userId = new ObjectId(userId)
    return mongoService.connect()
        .then(db => {
            const collection = db.collection('parking');
            return collection.find({ ownerId: userId }).toArray();
        })
}

function getReservedParkingsByUserId(userId) {
    userId = new ObjectId(userId)
    return mongoService.connect()
        .then(db => {
            const collection = db.collection('parking');
            return collection.find({ reserverId: userId }).toArray();
        })
}
function add(parking) {
    console.log('parking49:',parking);
    parking.ownerId = new ObjectId(parking.ownerId);
  
    console.log('parking.ownerId!!!!!!!', parking.ownerId);
    parking.position = {
        type : 'Point',
        coordinates  : [parking.location.lat, parking.location.lng]
    }
    
    parking.createdAt = Date.now(); 
    return mongoService.connect()
        .then(db => {
            const collection = db.collection('parking');
            console.log('parking55:',parking);
            return collection.insertOne(parking)
                .then(result => {
                    console.log('res got!', result)
                    parking._id = result.insertedId;
                    return parking;
                })
        })
}


function reserve(parking) {
    console.log('rsv parking in backend service: ', parking)
    parking.reserverId = new ObjectId(parking.reserverId)
    parking._id = new ObjectId(parking._id)
    console.log(parking)
    return mongoService.connect()
        .then(db => {
            const collection = db.collection('parking');
            return collection.updateOne({ _id: parking._id },
                { $set: { reserverId: parking.reserverId, occupiedUntil: parking.occupiedUntil } })
                .then(result => {
                    return parking;
                })
        })
}


function update(parking) {
    console.log('parking in the parking service in backend: ', parking)
    parking._id = new ObjectId(parking._id)
    parking.reserverId = new Object(parking.reserverId)
    parking.ownerId = new Object(parking.ownerId)
    return mongoService.connect()
        .then(db => {
            const collection = db.collection('parking');
            return collection.updateOne({ _id: parking._id }, { $set: parking })
                .then(result => {
                    return parking;
                })
        })
}
function stop(parking) {
    parking._id = new ObjectId(parking._id)
    parking.ownerId = new ObjectId(parking.ownerId)
    return mongoService.connect()
        .then(db => {
            const collection = db.collection('parking');
            return collection.updateOne({ _id: parking._id }, { $set: parking })
                .then(result => {
                    return parking;
                })
        })
}

async function getParkingsByLocation(lng, lat) {
    var db = await mongoService.connect()
    return db.collection('parking')
        .find({
            "position": {
                $near: {
                    $geometry: {
                        type: "Point",
                        coordinates: [
                            lng,
                            lat
                        ]
                    },
                //  $maxDistance: 10000
                }
            }
        }).toArray()
}



module.exports = {
    query,
    remove,
    getById,
    add,
    update,
    reserve,
    stop,
    getOwnedParkingsByUserId,
    getReservedParkingsByUserId,
    getParkingsByLocation
}
