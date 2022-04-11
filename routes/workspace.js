const {Router} = require('express')
const handlers = require('../handlers/workspace')
const route = Router()
const {isAuthenticated} = require('../middlewares/authMiddleware')

route.post('/', isAuthenticated, handlers.create)
route.get('/:workspaceId', isAuthenticated, handlers.find)
route.put('/:workspaceId', isAuthenticated, handlers.update)
route.delete('/:workspaceId', isAuthenticated, handlers.remove)

module.exports = route
