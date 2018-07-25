const parkingService = require('../services/parking-service.js')
const userService = require('../services/user-service.js')


function addParkingRoutes(app) {
    // PARKINGS REST API:

    // LIST
    app.get('/parking', (req, res) => {
        parkingService.query()
            .then(parkings => res.json(parkings))
            
    })

    // SINGLE

    // axios('/parking/5bsahsafjkafgvnkal')



    app.get('/parking/:parkingId/', async (req, res) => {
        const parkingId = req.params.parkingId;

        var parking =  await parkingService.getById(parkingId)
        var owner = await userService.getById(parking.ownerId)

       var x =  {
            parking: parking,
            owner: owner
        }
        res.json(x)
        // Promise.all([
        //     parkingService.getById(parkingId),
        //     userService.query({ownerId})
        // ])
        // .then(([parking,reviews]) => {
        //     res.json( {
        //         parking,reviews
        //     })
        // })
    })

    // DELETE
    app.delete('/parking/:parkingId', (req, res) => {
        const parkingId = req.params.parkingId;
        parkingService.remove(parkingId)
            .then(() => res.end(`Parking ${parkingId} Deleted `))
    })

    // CREATE
    app.post('/parking', (req, res) => {
        const parking = req.body;
        parkingService.add(parking)
            .then(parking => {
                res.json(parking)
            })
    })

    // UPDATE
    app.put('/parking/:parkingId', (req, res) => {
        const parking = req.body;
        parkingService.update(parking)
            .then(parking => res.json(parking))
    })

}


module.exports = addParkingRoutes;