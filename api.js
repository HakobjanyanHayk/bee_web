const { Router } = require('express')
const auth = require('./routes/auth')
const user = require('./routes/user')
const api = Router()

api.use('/auth', auth)
api.use('/user', user)

module.exports = api
