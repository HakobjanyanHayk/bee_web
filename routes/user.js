const { Router }= require('express')
const handlers = require("../handlers/user")
const route = Router()



route.post('/', handlers.createOne)
route.put('/:id', handlers.updateUser)

module.exports = route
