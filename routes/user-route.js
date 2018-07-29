const userService = require('../services/user-service')
const parkingService = require('../services/parking-service')
const BASE = '/user'

function addUserRoutes(app) {
    app.get('/user', (req, res) => {
        userService.query()
            .then(users => res.json(users))
    })

    app.get(`${BASE}/:userId`, (req, res) => {
        console.log('req params: ', req.params)
        const userId = req.params.userId
        // console.log('req params userId : ', req.params.userId)
        // console.log('userID in route : ', userId)
        Promise.all([
            userService.getById(userId),
            parkingService.getOwnedParkingsByUserId(userId),
            parkingService.getReservedParkingsByUserId(userId)
        ])
        .then (([user,ownedParkings,reservedParkings]) => {
            console.log('user: ', {user})
            console.log('reserved parkings: ', {reservedParkings})
            console.log('owned parkings: ', {ownedParkings})
            res.json({user,reservedParkings,ownedParkings}) 
        })


        // Promise.all([
        //     userService.getById(userId),
        //     parkingService.getByOwnerId(userId),
        //     parkingService.getByReservedId(userId)
        // ])
        // .then(([user, ownedParkings,reserveParkings]) => {
        //     console.log({user})
        //     res.json({user,ownedParkings,reserveParkings})
        // })
    })

    app.post(`${BASE}/checkLogin`, (req,res) => {
        console.log('req', req)
        var email = req.body
        userService.checkLogin(email)
        .then (user => {
            console.log('user returned to user route: ', user)
            req.session.user = user
            console.log('req.session.user: ',req.session.user )            
            res.json(user)
        })
        .catch(err => res.status(401).send('Wrong user/pass'))        
    })
}


module.exports = addUserRoutes;