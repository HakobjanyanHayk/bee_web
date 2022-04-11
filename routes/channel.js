const {Router} = require('express')
const handlers = require('../handlers/channel')
const route = Router()
const {isAuthenticated} = require('../middlewares/authMiddleware')

route.post('/:workspaceId', isAuthenticated, handlers.create)
route.get('/:channelId', isAuthenticated, handlers.find)
route.put('/:channelId', isAuthenticated, handlers.update)
route.delete('/:channelId', isAuthenticated, handlers.remove)

module.exports = route
