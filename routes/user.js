const {Router} = require('express')
const handlers = require('../handlers/user')
const route = Router()
const {isAuthenticated} = require('../middlewares/authMiddleware')

route.put('/', isAuthenticated, handlers.update)

module.exports = route
