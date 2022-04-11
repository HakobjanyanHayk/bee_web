const {Router} = require('express')
const handlers = require('../handlers/workspace')
const route = Router()
const {checkToken} = require('../middlewares/authMiddleware')

route.post('/', checkToken, handlers.createWorkspace)
route.get('/:workspaceId', checkToken, handlers.getWorkspace)
route.put('/:workspaceId', checkToken, handlers.updateWorkspace)
route.delete('/:workspaceId', checkToken, handlers.deleteWorkspace)

module.exports = route
