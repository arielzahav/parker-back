const userService = require('../services/user-service')
const parkingService = require('../services/parking-service')
const BASE = '/user'

function addUserRoutes(app) {
    app.get('/user', (req, res) => {
        userService.query()
            .then(users => res.json(users))
    })
    
    app.post('/login', (req, res) => {
        const mail = req.body
        console.log('email:',mail);
        
        userService.checkLogin(mail)
            .then(user => res.json(user)).catch(err =>{console.log('user is not exist');
            })
    })
    app.get('/user/:id', (req, res) => {
        const userId = req.params.id
        Promise.all([
            userService.getById(userId),
            parkingService.getByOwnerId(userId),
            parkingService.getByReservedId(userId)
        ])
        .then(([user, ownedParkings,reserveParkings]) => {
            console.log({user})
            res.json({user,ownedParkings,reserveParkings})
        })
    })
}


module.exports = addUserRoutes;