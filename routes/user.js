const {Router} = require('express')
const handlers = require('../handlers/user')
const route = Router()
const {checkToken} = require('../middlewares/authMiddleware')

route.put('/', checkToken, handlers.updateUser)

module.exports = route
