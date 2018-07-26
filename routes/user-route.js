const userService = require('../services/user-service')
const parkingService = require('../services/parking-service')
const BASE = '/user'

function addRoutes(app) {
    // app.get(BASE, (req, res) => {
    //     userService.query()
    //         .then(users => res.json(users))
    // })
    // app.get(`${BASE}/:id`, (req, res) => {
    //     const userId = req.params.id
    //     Promise.all([
    //         userService.getById(userId),
    //         reviewService.query({ userId })
    //     ])
    //     .then(([user, reviews]) => {
    //         console.log({user})
    //         res.json({user,reviews})
    //     })
    // })
}


module.exports = addRoutes;